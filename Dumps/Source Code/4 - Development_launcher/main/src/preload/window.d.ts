import type path from 'path';

import { type ElectronAPI } from '@electron-toolkit/preload';

declare global {
	// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
	interface Window {
		electron: ElectronAPI;
		path: typeof path;
	}
}
