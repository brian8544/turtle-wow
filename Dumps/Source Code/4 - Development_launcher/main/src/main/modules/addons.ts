/* eslint-disable import/no-named-as-default-member */
import path from 'node:path';

import git, { type ProgressCallback } from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs-extra';
import fetch from 'node-fetch';
import Logger from 'electron-log/main';

import { isNotUndef } from '~common/utils';
import { type AddonData, type TocData } from '~common/schemas';
import { runWorker } from '~main/utils';
import gitPull from '~main/workers/gitPull?nodeWorker';
import gitClone from '~main/workers/gitClone?nodeWorker';

import Preferences from './preferences';
import Observable from './observable';

export type AddonsStatus = {
	state: 'verifying' | 'done';
	addons: { [name: string]: AddonData };
	available: AddonData[];
};

type AddonsList = {
	name: string;
	owner: string;
	branch?: string;
	git: string;
	dependencies?: string[];
}[];

const readTocData = (content: string) =>
	content
		.split('\n')
		.filter(l => l.startsWith('## '))
		.map(l => l.slice(3))
		.map(l => {
			const [key, value] = l.split(':');
			return [key.trim(), value.trim()];
		})
		.reduce((acc, [key, value]) => {
			acc[key] = value;
			return acc;
		}, {} as TocData);

const fetchAddons = async () => {
	try {
		const response = await fetch(
			`${import.meta.env.MAIN_VITE_SERVER_URL}/api/addons.json`
		);
		return (await response.json()) as AddonsList;
	} catch (e) {
		Logger.error('Failed to reach update server', e);
		return [];
	}
};

class AddonsClass extends Observable<AddonsStatus> {
	protected _value: AddonsStatus = {
		state: 'done',
		addons: {},
		available: []
	};

	get status() {
		return this._value;
	}
	private set status(v: AddonsStatus) {
		this._value = v;
		this._notifyObservers(v);
	}

	#onProgress =
		(folder: string, data: AddonData): ProgressCallback =>
		progress => {
			const getPhase = (step: string) => {
				switch (step) {
					case 'Counting objects':
						return 1;
					case 'Compressing objects':
						return 2;
					case 'Receiving objects':
						return 3;
					case 'Resolving deltas':
						return 4;
					case 'Analyzing workdir':
						return 5;
					case 'Updating workdir':
						return 6;
					default:
						return 0;
				}
			};
			this.#setAddon(folder, {
				...data,
				progress: `${Math.round(
					(progress.loaded / (progress.total ?? progress.loaded)) * 100
				)}% (${getPhase(progress.phase)}/6)`
			});
		};

	async checkGitUrl(url: string) {
		const gitUrl = url.endsWith('.git') ? url : `${url}.git`;
		try {
			await git.getRemoteInfo({
				http,
				url: gitUrl
			});
			const response = await fetch(url).then(r => r.text());
			const preview = response.match(
				/property="og:image" content="([^"]*)"/
			)?.[1];
			return {
				status: 'available',
				folder: gitUrl.slice(0, -4).split('/').at(-1),
				git: gitUrl,
				preview
			} as AddonData;
		} catch (e) {
			return undefined;
		}
	}

	async verify() {
		const clientPath = Preferences.data.clientDir;
		if (!clientPath) return;
		if (this.status.state !== 'done') return;

		this.status = {
			...this.status,
			state: 'verifying'
		};

		const addonsPath = path.join(clientPath, 'Interface', 'Addons');
		const dirs = await fs.readdir(addonsPath);
		const addons: AddonsStatus['addons'] = Object.fromEntries(
			dirs
				.filter(d => !d.startsWith('Blizzard_'))
				.map(name => [name, { status: 'fetching' as const, folder: name }])
		);

		const remoteAddons = await fetchAddons();
		const available = await Promise.all(
			remoteAddons.map(async a => {
				const toc = await fetch(
					`${a.git.slice(0, -4)}/raw/${a.branch ?? 'master'}/${a.name}.toc`
				).then(r => r.text());
				return {
					status: 'available',
					git: a.git,
					toc: readTocData(toc),
					folder: a.name,
					branch: a.branch
				} as AddonData;
			})
		);

		this.status = { state: 'verifying', addons, available };

		for (const folder of Object.keys(addons)) {
			const dir = path.join(addonsPath, folder);

			if (!fs.existsSync(path.join(dir, `${folder}.toc`))) {
				this.#setAddon(folder, {
					status: 'invalid',
					error: 'Missing .toc file',
					folder
				});
				continue;
			}

			const toc = await readTocData(
				await fs.readFile(path.join(dir, `${folder}.toc`), 'utf-8')
			);

			const remote = await git
				.listRemotes({ fs, dir })
				.then(r => r[0])
				.catch(() => null);

			const avail = remoteAddons.find(a => a.name === folder);
			if (!remote) {
				Logger.log(`Addon "${folder}" is not a git repository`);
				this.#setAddon(
					folder,
					avail
						? { status: 'outOfDate', git: avail.git, toc, folder }
						: { status: 'unknown', toc, folder }
				);
				continue;
			}

			try {
				// Fetch updates from the remote
				await git.fetch({ fs, dir, http });

				// Get the current branch
				const branch = await git.currentBranch({ fs, dir });

				// Get the commit logs for the current branch and its upstream branch
				const [localCommit, remoteCommit] = await Promise.all([
					git
						.log({ fs, dir, ref: `${branch}`, depth: 1 })
						.then(r => r[0].oid)
						.catch(() => null),
					git
						.log({ fs, dir, ref: `${remote.remote}/${branch}`, depth: 1 })
						.then(r => r[0].oid)
						.catch(() => null)
				]);

				const status = await git.statusMatrix({ fs, dir });
				const hasChanges = status.some(
					([_, HEAD, index, workdir]) => HEAD !== index || index !== workdir
				);

				const isUpToDate =
					!hasChanges && remoteCommit && localCommit === remoteCommit;
				this.#setAddon(folder, {
					git: remote.url,
					status: isUpToDate ? 'upToDate' : 'outOfDate',
					toc,
					folder
				});

				Logger.log(
					isUpToDate
						? `Addon "${folder}" is up to date`
						: `Addon "${folder}" has an update available`
				);
			} catch (e) {
				this.#setAddon(folder, {
					git: remote.url,
					status: 'invalid',
					error: 'Failed to verify',
					toc,
					folder
				});
				Logger.error(`Addon "${folder}" failed to verify`, e);
			}
		}

		this.status = { ...this.status, state: 'done' };
	}

	async update(
		toUpdate = Object.values(this.status.addons)
			.filter(e => e.status === 'outOfDate')
			.map(e => e.folder)
			.filter(isNotUndef)
	) {
		const clientPath = Preferences.data.clientDir;
		if (!clientPath) return;
		if (this.status.state !== 'done') return;

		const addonsPath = path.join(clientPath, 'Interface', 'Addons');

		for (const folder of toUpdate) {
			// TODO: Check dependencies
			if (this.status.addons[folder]?.status === 'downloading') continue;
			const dir = path.join(addonsPath, folder);

			const avail = this.status.available.find(a => a.folder === folder);
			const data: AddonData = {
				...avail,
				...this.status.addons[folder],
				status: 'downloading'
			};
			this.#setAddon(folder, data);

			const remote = await git
				.listRemotes({ fs, dir })
				.then(r => r?.[0])
				.catch(() => null);

			try {
				if (!remote) {
					await runWorker(
						gitClone,
						{ dir, url: data.git, ref: data.branch },
						{ onProgress: this.#onProgress(folder, data) }
					);
				} else {
					const branch =
						(await git.currentBranch({ fs, dir })) ?? avail?.branch ?? 'master';
					await runWorker(
						gitPull,
						{ dir, remote: remote.remote, branch },
						{ onProgress: this.#onProgress(folder, data) }
					);
				}
				const toc = await readTocData(
					await fs.readFile(path.join(dir, `${folder}.toc`), 'utf-8')
				);

				this.#setAddon(folder, { ...data, toc, status: 'upToDate' });
				Logger.log(`Updated addon "${folder}"`);
			} catch (e) {
				this.#setAddon(folder, {
					...data,
					status: 'invalid',
					error: 'Failed to update'
				});
				Logger.error(`Addon "${folder}" failed to update`, e);
			}
		}
	}

	async remove(toRemove: string[]) {
		const clientPath = Preferences.data.clientDir;
		if (!clientPath) return;
		if (this.status.state !== 'done') return;

		for (const folder of toRemove) {
			// TODO: Remove dependencies
			const dir = path.join(clientPath, 'Interface', 'Addons', folder);
			if (!fs.existsSync(dir)) continue;
			await fs.remove(dir);
			this.#setAddon(folder);
			Logger.log(`Removed addon "${folder}"`);
		}
	}

	async install(data: AddonData) {
		const clientPath = Preferences.data.clientDir;
		if (!clientPath) return;

		const addonsPath = path.join(clientPath, 'Interface', 'Addons');
		const dir = path.join(addonsPath, data.folder);
		try {
			await runWorker(
				gitClone,
				{ dir, url: data.git, ref: data.branch },
				{ onProgress: this.#onProgress(data.folder, data) }
			);
			const toc = await readTocData(
				await fs.readFile(path.join(dir, `${data.folder}.toc`), 'utf-8')
			);
			this.#setAddon(data.folder, { ...data, toc, status: 'upToDate' });
			Logger.log(`Installed addon "${data.folder}"`);
		} catch (e) {
			this.#setAddon(data.folder, {
				...data,
				status: 'invalid',
				error: 'Failed to install'
			});
			Logger.error(`Addon "${data.folder}" failed to install`, e);
		}
	}

	#setAddon(folder: string, data?: AddonData) {
		const { [folder]: _, ...addons } = this.status.addons;
		this.status = {
			...this.status,
			addons: data ? { ...addons, [folder]: data } : addons
		};
	}
}

const Addons = new AddonsClass();
export default Addons;
