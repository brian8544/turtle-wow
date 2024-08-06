import path from 'path';

import { contextBridge } from 'electron';
import { electronAPI } from '@electron-toolkit/preload';
import { exposeElectronTRPC } from 'electron-trpc/main';

try {
	contextBridge.exposeInMainWorld('electron', electronAPI);
	contextBridge.exposeInMainWorld('path', path);
} catch (error) {
	console.error(error);
}

process.once('loaded', async () => {
	exposeElectronTRPC();
});
