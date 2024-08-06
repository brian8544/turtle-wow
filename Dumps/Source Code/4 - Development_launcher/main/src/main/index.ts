import { join } from 'path';

import { app, shell, BrowserWindow } from 'electron';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { createIPCHandler } from 'electron-trpc/main';
import Logger from 'electron-log/main';

import icon from '~build/icon.png?asset';

import { appRouter } from './api/root';
import Preferences from './modules/preferences';
import Updater from './modules/updater';
import Addons from './modules/addons';

// Setup logger
Logger.initialize();
Logger.errorHandler.startCatching();
Logger.info('Launcher starting...');

export let mainWindow: BrowserWindow | null = null;

const createWindow = async () => {
	const position = Preferences.data.rememberPosition
		? Preferences.data.windowPosition
		: { width: 800, height: 600 };

	// Create the browser window.
	mainWindow = new BrowserWindow({
		...position,
		minWidth: 800,
		minHeight: 600,
		icon,
		frame: false,
		webPreferences: {
			preload: join(__dirname, '../preload/index.js'),
			contextIsolation: true,
			sandbox: false,
			devTools: import.meta.env.MODE !== 'production'
		}
	});

	createIPCHandler({ router: appRouter, windows: [mainWindow] });

	mainWindow.on('ready-to-show', () => {
		// Clean up all observers
		Updater.clearObservers();
		Addons.clearObservers();

		mainWindow?.show();
	});

	mainWindow.webContents.setWindowOpenHandler(details => {
		shell.openExternal(details.url);
		return { action: 'deny' };
	});

	mainWindow.on('close', async () => {
		if (!mainWindow) return;
		const [x = 0, y = 0] = mainWindow.getPosition();
		const [width = 0, height = 0] = mainWindow.getSize();
		Preferences.data = { windowPosition: { x, y, width, height } };
	});

	// HMR for renderer base on electron-vite cli.
	// Load the remote URL for development or the local html file for production.
	if (is.dev && process.env.ELECTRON_RENDERER_URL) {
		mainWindow.loadURL(process.env.ELECTRON_RENDERER_URL);
	} else {
		mainWindow.loadFile(join(__dirname, '../renderer/index.html'));
	}
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
	Preferences.data = await Preferences.load();

	Addons.verify();
	Updater.verify();

	// Set app user model id for windows
	electronApp.setAppUserModelId('com.electron');

	// Default open or close DevTools by F12 in development
	// and ignore CommandOrControl + R in production.
	// see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
	app.on('browser-window-created', (_, window) => {
		optimizer.watchWindowShortcuts(window);
	});

	await createWindow();
});

// Quit when all windows are closed
app.on('window-all-closed', async () => {
	app.quit();
});
