import path from 'node:path';
import crypto from 'node:crypto';
import { exec } from 'node:child_process';
import os from 'node:os';

import fetch from 'node-fetch';
import fs from 'fs-extra';
import {
	SFileOpenArchive,
	type HANDLE,
	SFileHasFile,
	SFileCloseArchive,
	SFileOpenFileEx,
	SFileReadFile,
	SFileGetFileSize,
	SFileCloseFile,
	SFileCreateFile,
	SFileWriteFile,
	SFileFinishFile,
	SFileFlushArchive,
	SFileRemoveFile,
	SFileCompactArchive
} from 'stormlib-node';
import {
	MPQ_COMPRESSION,
	MPQ_FILE,
	STREAM_FLAG
} from 'stormlib-node/dist/enums';
import Logger from 'electron-log/main';

import {
	asyncMap,
	formatFileSize,
	isNotUndef,
	nestedGet,
	nestedSet
} from '~common/utils';
import { mainWindow } from '~main/index';
import { patchExecutable } from '~main/modules/patcher';
import { getClientVersion } from '~main/utils';

import Preferences from './preferences';
import Observable from './observable';

const getAvailableDiskSpace = () =>
	new Promise<number>((resolve, reject) => {
		exec('wmic logicaldisk get FreeSpace,Size', (error, stdout) => {
			if (error) {
				reject(error);
				return;
			}

			const lines = stdout.trim().split(os.EOL);
			const data = lines[1].split(/\s+/);

			resolve(parseInt(data[0]));
		});
	});

const isReadOnly = async (filePath: string) => {
	try {
		const { mode } = await fs.stat(filePath);
		return !(mode & fs.constants.S_IWUSR);
	} catch (e) {
		return false;
	}
};

type FolderTags = 'allowExtra';
type FileTags = 'vanillaFixes';

type FileManifest = { name: string } & (
	| { type: 'del' }
	| { type: 'dir'; files: FileManifest[]; tags?: FolderTags[] }
	| { type: 'mpq'; files: FileManifest[]; hash: string; size: number }
	| {
			type: 'file';
			hash: string;
			version?: number;
			size: number;
			tags?: FileTags[];
	  }
);

type CacheEntry = [hash: string, mtime: number];
type CacheTree = { [key: string]: CacheTree & CacheEntry };

const getManifestSize = (m?: FileManifest): number =>
	(m?.type === 'del'
		? 0
		: m?.type === 'file'
		? m?.size
		: m?.files?.reduce((acc, v) => acc + getManifestSize(v), 0)) ?? 0;

const getManifestFiles = (m?: FileManifest, p = ''): string[] =>
	(m?.type === 'del'
		? [`-- ${path.join(p, m?.name)}`]
		: m?.type === 'file'
		? [`++ ${path.join(p, m?.name)}`]
		: m?.files?.flatMap(v => getManifestFiles(v, path.join(p, m?.name)))) ?? [];

const getManifestItem = (
	m?: FileManifest,
	p?: string[]
): FileManifest | undefined => {
	if (!p?.length) return m;

	if (m?.type === 'file' || m?.type === 'del')
		throw Error(`Can't access ${p.join('.')} from file ${m.name}`);

	const [next, ...rest] = p;
	return getManifestItem(
		m?.files.find(f => f.name === next),
		rest
	);
};

// TODO: Support for other platforms?
export const isGameRunning = (executablePath: string) =>
	os.platform() === 'win32'
		? new Promise((resolve, reject) => {
				exec(
					`wmic process where "ExecutablePath='${executablePath.replaceAll(
						'\\',
						'\\\\'
					)}'" get ExecutablePath`,
					(error, stdout) => {
						if (error) {
							reject(error);
						} else {
							resolve(stdout.trim().includes(executablePath));
						}
					}
				);
		  })
		: false;

const fetchManifest = async () => {
	try {
		const ver = Preferences.data.version ?? 'latest';
		const r = await fetch(
			`${import.meta.env.MAIN_VITE_SERVER_URL}/api/file/${ver}/manifest.json`,
			{ headers: { XApiKey: 'Test' } }
		);
		const j = await r.json();
		await fs.writeJSON(path.join(Preferences.userDataDir, 'manifest.json'), j);
		return j.root as FileManifest;
	} catch (e) {
		Logger.error('Failed to reach update server', e);
		return null;
	}
};

export const fetchFile = async (filePath: string) => {
	try {
		const ver = Preferences.data.version ?? 'latest';
		const response = await fetch(
			`${import.meta.env.MAIN_VITE_SERVER_URL}/api/file/${ver}/${path.normalize(
				filePath
			)}`,
			{ headers: { XApiKey: 'Test' } }
		);
		return await response.arrayBuffer();
	} catch (e) {
		Logger.error(`Failed to download ${path.normalize(filePath)}`, e);
		throw Error(`Failed to download ${path.normalize(filePath)}`);
	}
};

type UpdaterState =
	| 'verifying'
	| 'serverUnreachable'
	| 'noClient'
	| 'updateAvailable'
	| 'updating'
	| 'upToDate'
	| 'failed';

export type UpdaterStatus = {
	state: UpdaterState;
	progress?: number;
	message?: string;
};

class UpdaterClass extends Observable<UpdaterStatus> {
	#manifest?: FileManifest;
	#cachePath = path.join(Preferences.userDataDir, 'cache.json');
	#cache: CacheTree = fs.existsSync(this.#cachePath)
		? fs.readJSONSync(this.#cachePath)
		: {};

	async #saveCache() {
		await fs.writeJSON(this.#cachePath, this.#cache);
	}

	async #getHash(
		{
			clientPath,
			...m
		}: { clientPath: string } & (
			| { hMpq: HANDLE; mpqPath: string[] }
			| { hMpq?: never }
		),
		...filePath: string[]
	) {
		// Is inside mpq
		if (m.hMpq) {
			if (!SFileHasFile(m.hMpq, path.join(...filePath))) {
				nestedSet(this.#cache, filePath, undefined);
				return undefined;
			}
			const c = nestedGet<CacheEntry>(this.#cache, [...m.mpqPath, ...filePath]);

			// Return hash if it's cached
			if (c?.[0]) return c[0];

			// Cache new hash
			const hFile = SFileOpenFileEx(m.hMpq, path.join(...filePath), 0);

			try {
				const fileSize = Number(SFileGetFileSize(hFile).toString());

				const buffer = new ArrayBuffer(fileSize);
				if (fileSize > 0) SFileReadFile(hFile, buffer);

				const newHash = crypto
					.createHash('sha1')
					.update(new Uint8Array(buffer))
					.digest('hex')
					.toLocaleUpperCase();

				nestedSet(this.#cache, [...m.mpqPath, ...filePath], { [0]: newHash });
				return newHash;
			} finally {
				SFileCloseFile(hFile);
			}
		}

		if (!(await fs.exists(path.join(clientPath, ...filePath)))) {
			nestedSet(this.#cache, filePath, undefined);
			return undefined;
		}

		const stats = await fs.stat(path.join(clientPath, ...filePath));
		if (stats.isDirectory())
			throw Error(`Tried to get hash of directory ${path.join(...filePath)}`);

		const c = nestedGet<CacheEntry>(this.#cache, filePath);

		// Return hash if it's cached
		if (c?.[0] && c[1] === stats.mtimeMs) return c[0];

		// Cache new hash
		const newHash = crypto
			.createHash('sha1')
			.update(await fs.readFile(path.join(clientPath, ...filePath)))
			.digest('hex')
			.toLocaleUpperCase();
		nestedSet(this.#cache, filePath, {
			...c,
			[0]: newHash,
			[1]: stats.mtimeMs
		});
		return newHash;
	}

	protected _value: UpdaterStatus = { state: 'failed' };

	get status() {
		return this._value;
	}
	private set status(v: UpdaterStatus) {
		this._value = v;
		this._notifyObservers(v);
		if (this.status.state === 'failed') {
			mainWindow?.setProgressBar(1, { mode: 'error' });
		} else if (this.status.progress === 1) {
			mainWindow?.setProgressBar(0);
		} else {
			mainWindow?.setProgressBar(this.status.progress ?? 0, {
				mode: this.status.progress === -1 ? 'indeterminate' : 'normal'
			});
		}
	}

	async verify() {
		if (this.status?.state === 'verifying' || this.status?.state === 'updating')
			return;

		const clientPath = Preferences.data.clientDir;
		if (!clientPath) {
			this.status = { state: 'noClient' };
			return;
		}

		if (os.platform() === 'win32' && clientPath.length > 220) {
			this.status = {
				state: 'failed',
				message:
					'Path to current install location is too long and may cause issues.'
			};
			return;
		}

		if (await isGameRunning(path.join(clientPath, 'WoW.exe'))) {
			this.status = {
				state: 'failed',
				message: 'Please close WoW first, before updating.'
			};
			return;
		}

		Logger.log(`Verifying client files at ${path.join(clientPath)}...`);
		this.status = {
			state: 'verifying',
			progress: -1,
			message: 'Looking for updates...'
		};

		try {
			const vanillaFixes = Preferences.data.config.vanillaFixes;

			const hashTree = await fetchManifest();
			if (!hashTree) {
				this.status = { state: 'serverUnreachable' };
				return;
			}
			this.#manifest = { type: 'dir', name: 'root', files: [] };

			const totalSize = getManifestSize(hashTree);
			let i = 0;

			const buildMpqTree = async (
				hMpq: HANDLE,
				mpqPath: string[],
				...filePath: string[]
			): Promise<FileManifest | undefined> => {
				const item = getManifestItem(hashTree, [...mpqPath, ...filePath]);
				if (!item) return undefined;

				if (item.type === 'del') return item;

				if (item.type === 'dir') {
					const files = (
						await asyncMap(item.files, f =>
							buildMpqTree(hMpq, mpqPath, ...filePath, f.name)
						)
					).filter(isNotUndef);
					return !files.length ? undefined : { ...item, files };
				}

				if (item.type === 'mpq')
					throw Error(
						`There can't be an mpq archive inside mpq at path ${path.join(
							...mpqPath,
							...filePath
						)}`
					);

				this.status = {
					state: 'verifying',
					progress: i / totalSize,
					message: `Verifying: [${mpqPath.at(-1)}] "${path.join(
						...filePath
					)}"...`
				};

				// Increment progress
				i += item.size;

				// Check if hash is same
				if (
					(await this.#getHash({ clientPath, hMpq, mpqPath }, ...filePath)) ===
					item.hash
				)
					return undefined;
				return item;
			};

			const buildTree = async (
				...filePath: string[]
			): Promise<FileManifest | undefined> => {
				const item = getManifestItem(hashTree, filePath);
				if (!item) return undefined;

				if (item.type === 'del') return item;

				if (item.type === 'dir') {
					// Mark all not allowed extra files to be deleted
					const toDelete =
						item.tags?.includes('allowExtra') ||
						!(await fs.exists(path.join(clientPath, ...filePath)))
							? []
							: (await fs.readdir(path.join(clientPath, ...filePath)))
									.filter(f => !item.files.find(m => m.name === f))
									.map(name => ({ type: 'del', name } as const));

					const files = (
						await asyncMap(item.files, f => buildTree(...filePath, f.name))
					).filter(isNotUndef);

					return !files.length && !toDelete.length
						? undefined
						: { ...item, files: [...files, ...toDelete] };
				}

				if (item.type === 'mpq') {
					const patchPath = [
						...filePath.slice(0, -1),
						`${filePath.at(-1)}.mpq`
					];
					this.status = {
						state: 'verifying',
						progress: i / totalSize,
						message: `Verifying: "${path.join(...patchPath)}"...`
					};

					if (!(await fs.exists(path.join(clientPath, ...patchPath)))) {
						i += item.size;
						return {
							type: 'file',
							name: `${item.name}.mpq`,
							hash: item.hash,
							size: item.size
						};
					}

					if (
						(await this.#getHash({ clientPath }, ...patchPath)) === item.hash
					) {
						i += item.size;
						return undefined;
					}

					try {
						const hMpq = SFileOpenArchive(
							path.join(clientPath, ...patchPath),
							STREAM_FLAG.READ_ONLY
						);

						try {
							const files = (
								await asyncMap(item.files, f =>
									buildMpqTree(hMpq, filePath, f.name)
								)
							).filter(isNotUndef);
							return !files.length ? undefined : { ...item, files };
						} finally {
							SFileCloseArchive(hMpq);
						}
					} catch (e) {
						Logger.log(
							`Failed to verify ${path.join(
								...patchPath
							)}, will be downloaded fresh`,
							'warning',
							e
						);
						return {
							type: 'file',
							name: `${item.name}.mpq`,
							hash: item.hash,
							size: item.size
						};
					}
				}

				if (item.tags?.includes('vanillaFixes') && !vanillaFixes) {
					if (await fs.exists(path.join(clientPath, ...filePath))) {
						return {
							type: 'del',
							name: item.name
						};
					} else {
						return undefined;
					}
				}

				this.status = {
					state: 'verifying',
					progress: i / totalSize,
					message: `Verifying: "${path.join(...filePath)}"...`
				};

				// Increment progress
				i += item.size;

				const hash = await this.#getHash({ clientPath }, ...filePath);

				// Skip if hash matches
				if (hash === item.hash) return undefined;

				// Check if newer version of file that allows changes is available
				if (hash && item.version) {
					const stats = await fs.stat(path.join(clientPath, ...filePath));
					if (item.version <= stats.mtimeMs) return undefined;
				}

				return item;
			};

			this.#manifest = await buildTree();

			await this.#saveCache();

			const toDownload = getManifestSize(this.#manifest);
			const availableSpace = await getAvailableDiskSpace();

			if (toDownload > availableSpace) {
				this.status = {
					state: 'failed',
					message: `Not enough disk space. Required: ${formatFileSize(
						toDownload
					)}, Available: ${formatFileSize(availableSpace)}`
				};
				return;
			}

			this.status = this.#manifest
				? { state: 'updateAvailable', message: formatFileSize(toDownload) }
				: { state: 'upToDate', progress: 1 };
			this.#manifest &&
				Logger.log(
					`Detected changes:\n\t${getManifestFiles(this.#manifest).join(
						',\n\t'
					)}`
				);
		} catch (e) {
			const message =
				e instanceof Error ? e.message : 'Unexpected error occurred';
			Logger.error(`Verification failed: ${message}`, e);
			this.status = { state: 'failed', message };
		}
	}

	async update(clean?: boolean) {
		if (this.status?.state === 'verifying' || this.status?.state === 'updating')
			return;

		const clientPath = Preferences.data.clientDir;
		if (!clientPath) {
			this.status = { state: 'noClient' };
			return;
		}

		if (await isGameRunning(path.join(clientPath, 'WoW.exe'))) {
			this.status = {
				state: 'failed',
				message: 'Please close WoW first, before updating.'
			};
			return;
		}

		Logger.log(`Updating client files at ${path.join(clientPath)}...`);
		this.status = {
			state: 'updating',
			progress: -1,
			message: 'Preparing files...'
		};

		try {
			if (clean) {
				this.status = {
					state: 'updating',
					progress: -1,
					message: 'Cleaning up old files...'
				};

				const files = await fs.readdir(clientPath);
				for (const file of files) {
					if (file === 'TurtleLauncher.exe') continue;
					await fs.rm(path.join(clientPath, file), {
						recursive: true,
						force: true
					});
				}
			}
			const hashTree =
				(clean ? undefined : this.#manifest) ?? (await fetchManifest());

			if (!hashTree) {
				this.status = { state: 'serverUnreachable' };
				return;
			}

			const totalSize = getManifestSize(hashTree);
			let i = 0;
			let executableUpdate = false;

			const iterateMpqTree = async (
				hMpq: HANDLE,
				mpqPath: string[],
				...filePath: string[]
			) => {
				const item = getManifestItem(hashTree, [...mpqPath, ...filePath]);
				if (!item) return undefined;

				if (item.type === 'del') {
					throw Error(
						`TODO: Deleting of files from MPQ not implemented at path ${path.join(
							...mpqPath,
							...filePath
						)}`
					);
				}

				if (item.type === 'dir') {
					for (const f of item.files)
						await iterateMpqTree(hMpq, mpqPath, ...filePath, f.name);
					return;
				}

				if (item.type === 'mpq')
					throw Error(
						`There can't be an mpq archive inside mpq at path ${path.join(
							...mpqPath,
							...filePath
						)}`
					);

				this.status = {
					state: 'verifying',
					progress: i / totalSize,
					message: `Verifying: [${mpqPath.at(-1)}] "${path.join(
						...filePath
					)}"...`
				};

				// Increment progress
				i += item.size;

				const data = await fetchFile(path.join(...mpqPath, ...filePath));

				if (SFileHasFile(hMpq, path.join(...filePath)))
					SFileRemoveFile(hMpq, path.join(...filePath));

				const hFile = SFileCreateFile(
					hMpq,
					path.join(...filePath),
					0,
					data.byteLength,
					0,
					MPQ_FILE.COMPRESS
				);
				try {
					SFileWriteFile(hFile, data, MPQ_COMPRESSION.ZLIB);
				} finally {
					SFileFinishFile(hFile);
				}
			};

			const iterateTree = async (...filePath: string[]) => {
				const item = getManifestItem(hashTree, filePath);
				if (!item) return undefined;

				if (item.type === 'del') {
					const fullPath = path.join(clientPath, ...filePath);
					if (await isReadOnly(fullPath))
						throw Error(
							`Failed to delete "${fullPath}" because it's read-only.`
						);

					await fs.remove(fullPath);

					// Remove from cache
					await this.#getHash({ clientPath }, ...filePath);
					return;
				}

				if (item.type === 'dir') {
					for (const i of item.files) await iterateTree(...filePath, i.name);
					return;
				}

				if (item.type === 'mpq') {
					const patchPath = [
						...filePath.slice(0, -1),
						`${filePath.at(-1)}.mpq`
					];
					const patchFile = path.join(clientPath, ...patchPath);
					this.status = {
						state: 'verifying',
						progress: i / totalSize,
						message: `Downloading: "${path.join(...patchPath)}"...`
					};

					if (!(await fs.exists(patchFile))) {
						const data = await fetchFile(patchFile);

						// Write file to disc
						await fs.ensureFile(patchFile);
						await fs.writeFile(patchFile, Buffer.from(data));
						return;
					}

					if (await isReadOnly(patchFile))
						throw Error(
							`Failed to update "${patchFile}" because it's read-only.`
						);

					const hMpq = SFileOpenArchive(path.join(clientPath, ...patchPath), 0);
					try {
						for (const f of item.files)
							await iterateMpqTree(hMpq, filePath, f.name);
						SFileFlushArchive(hMpq);
						SFileCompactArchive(hMpq);
					} finally {
						SFileCloseArchive(hMpq);
					}
					return;
				}

				// Download the file
				this.status = {
					state: 'updating',
					progress: i / (totalSize + 1),
					message: `Downloading: "${path.join(...filePath)}"...`
				};
				const data = await fetchFile(path.join(...filePath));

				if (item.name === 'WoW.exe') executableUpdate = true;

				const fullPath = path.join(clientPath, ...filePath);
				if (await isReadOnly(fullPath))
					throw Error(`Failed to update "${fullPath}" because it's read-only.`);

				// Write file to disc
				await fs.ensureFile(fullPath);
				await fs.writeFile(fullPath, Buffer.from(data));

				// Refresh cache with new file
				await this.#getHash({ clientPath }, ...filePath);

				// Increment progress
				i += item.size;
			};

			await iterateTree();
			await this.#saveCache();

			if (executableUpdate) {
				await patchExecutable();
				Preferences.data = { version: await getClientVersion() };
			}

			this.status = { state: 'upToDate', progress: 1 };
		} catch (e) {
			console.error(e);
			this.status = {
				state: 'failed',
				message: e instanceof Error ? e.message : 'Unexpected error occurred'
			};
		}
	}
}

const Updater = new UpdaterClass();
export default Updater;
