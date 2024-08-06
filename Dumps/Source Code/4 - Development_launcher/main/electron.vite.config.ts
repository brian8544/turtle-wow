import { resolve } from 'path';

import { defineConfig, externalizeDepsPlugin } from 'electron-vite';
import react from '@vitejs/plugin-react';

const alias = {
	'~common': resolve('src/common'),
	'~main': resolve('src/main'),
	'~renderer': resolve('src/renderer'),
	'~build': resolve('build')
};

export default defineConfig({
	main: {
		resolve: { alias },
		plugins: [externalizeDepsPlugin()]
	},
	preload: {
		plugins: [externalizeDepsPlugin()]
	},
	renderer: {
		resolve: { alias },
		plugins: [react()]
	}
});
