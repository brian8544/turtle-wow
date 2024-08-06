import path from 'path';
import { spawn } from 'child_process';

import fs from 'fs-extra';
import { inject } from 'dll-inject';
import Logger from 'electron-log/main';

import Preferences from '~main/modules/preferences';
import { mainWindow } from '~main/index';
import { isGameRunning } from '~main/modules/updater';
import { patchConfig } from '~main/modules/patcher';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const launcherRouter = createTRPCRouter({
	start: publicProcedure.mutation(async () => {
		const { cleanWdb, reopenLauncher, config, clientDir } = Preferences.data;
		if (!clientDir) return false;

		const clientPath = path.join(clientDir, 'WoW.exe');
		Logger.log(`Launching ${clientPath}...`);
		if (await isGameRunning(clientPath)) return false;

		if (cleanWdb) {
			Logger.log('Cleaning up WDB...');
			await fs.remove(path.join(clientPath, 'WDB'));
		}

		// Make sure config.wtf is correct
		Logger.log('Checking Config.wtf...');
		await patchConfig();

		Logger.log('Launching WoW...');
		const process = spawn(clientPath, { detached: !reopenLauncher });

		if (config.vanillaFixes) {
			Logger.log('Injecting VanillaFixes...');
			const vfPath = path.join(clientDir, 'VfPatcher.dll');

			const status = inject('WoW.exe', vfPath);
			if (status) {
				Logger.error(`Injecting failed with error code ${status}...`);
				return true;
			}
		}

		if (!reopenLauncher) {
			mainWindow?.close();
			return true;
		}

		mainWindow?.hide();
		process.on('exit', () => {
			Logger.log('WoW stopped');
			mainWindow?.show();
		});
		return true;
	})
});
