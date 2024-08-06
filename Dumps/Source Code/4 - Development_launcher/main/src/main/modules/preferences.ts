import path from 'path';

import fs from 'fs-extra';
import { type z } from 'zod';
import { app } from 'electron';

import { PreferencesSchema } from '~common/schemas';
import { omit } from '~common/utils';

const portableDir = process.env.PORTABLE_EXECUTABLE_DIR;

abstract class Preferences {
	static #data: z.infer<typeof PreferencesSchema>;

	static readonly userDataDir = process.env.PORTABLE_EXECUTABLE_DIR
		? path.join(process.env.PORTABLE_EXECUTABLE_DIR, '.launcher')
		: app.getPath('userData');

	static async load() {
		const userDataPath = path.join(this.userDataDir, 'settings.json');
		try {
			const json = await fs.readJSON(userDataPath);
			return PreferencesSchema.parse({
				...json,
				isPortable: !!portableDir,
				clientDir: portableDir ?? json.clientDir
			});
		} catch (e) {
			return PreferencesSchema.parse({
				isPortable: !!portableDir,
				clientDir: portableDir
			});
		}
	}

	static get data(): PreferencesSchema {
		return this.#data;
	}

	static set data(newData: Partial<Omit<PreferencesSchema, 'portableDir'>>) {
		this.#data = { ...this.#data, ...newData };
		fs.writeJSON(
			path.join(this.userDataDir, 'settings.json'),
			omit(
				this.#data,
				portableDir ? ['isPortable', 'clientDir'] : ['isPortable']
			),
			{ spaces: 2 }
		);
	}

	static async isValidClientDir(clientDir?: string) {
		return !!clientDir && (await fs.exists(path.join(clientDir, 'WoW.exe')));
	}
}

export default Preferences;
