import { type Worker, type WorkerOptions } from 'node:worker_threads';
import path from 'node:path';

import Logger from 'electron-log/main';
import fs from 'fs-extra';

import Preferences from './modules/preferences';

const isCallbackResponse = (data: any): data is { cb: string; args: any[] } =>
	data && typeof data === 'object' && 'cb' in data && 'args' in data;

export const runWorker = <T>(
	worker: (o: WorkerOptions) => Worker,
	workerData: Record<string, unknown>,
	callbacks?: Record<string, (...data: any[]) => void>
) =>
	new Promise<T>((resolve, reject) =>
		worker({ workerData })
			.on('message', m =>
				isCallbackResponse(m) ? callbacks?.[m.cb](...m.args) : resolve(m)
			)
			.on('error', reject)
	);

export const getClientVersion = async () => {
	Logger.log('Reading client version...');

	const exePath = path.join(Preferences.data.clientDir ?? '', 'WoW.exe');

	if (!(await fs.exists(exePath))) {
		Logger.log('Client not found...');
		return undefined;
	}

	const file = await fs.readFile(exePath);
	const buffer = Buffer.from(file);

	const version = buffer.toString('utf-8', 0x00437c04, 0x00437c04 + 6);
	const build = buffer.toString('utf-8', 0x00437bfc, 0x00437bfc + 4);

	Logger.log(`Client version is: ${version} (${build})`);
	return `${version} (${build})`;
};
