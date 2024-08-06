import path from 'path';

import { screen } from 'electron';
import fs from 'fs-extra';
import Logger from 'electron-log/main';

import Preferences from '~main/modules/preferences';
import { ConfigWtfSchema, type PreferencesSchema } from '~common/schemas';
import { isNotUndef } from '~common/utils';
import { fetchFile } from '~main/modules/updater';

// TODO: Hardcoded for now
const Servers = {
	live: {
		realmList: 'logon.turtle-wow.org',
		patchList: 'logon.turtle-wow.org',
		realmName: 'Turtle WoW'
	},
	ptr: {
		realmList: '51.89.212.97:60690',
		patchList: '51.89.212.97:60690',
		realmName: 'The Sims Online'
	}
} as const;

type Tweak = { key: keyof PreferencesSchema['config']; default?: unknown } & (
	| {
			type: 'bytes';
			tweaks: [number, number[]][];
	  }
	| {
			type: 'int8' | 'uint16' | 'float';
			offset: number;
			value?: number;
	  }
);

export const patchExecutable = async () => {
	Logger.log('Patching WoW.exe...');

	const { clientDir, config } = Preferences.data;
	if (!clientDir) return;
	const exePath = path.join(clientDir, 'WoW.exe');

	try {
		Logger.log('Fetching clean WoW.exe...');
		const file = await fetchFile('WoW.exe');
		const buffer = Buffer.from(file);

		const Tweaks = [
			{
				key: 'largeAddress',
				type: 'uint16',
				offset: 0x126,
				value: buffer.readUint16LE(0x126) | 0x20,
				default: false
			},
			{ key: 'farClip', type: 'float', offset: 0x40fed8 },
			{
				key: 'fieldOfView',
				type: 'float',
				offset: 0x4089b4,
				value: (config.fieldOfView ?? 1) * (Math.PI / 180),
				default: 90
			},
			{ key: 'frillDistance', type: 'float', offset: 0x467958 },
			{
				key: 'soundInBackground',
				type: 'int8',
				offset: 0x3a4869,
				value: config.soundInBackground ? 0x27 : 0x14,
				default: false
			},
			{
				key: 'alwaysAutoLoot',
				type: 'bytes',
				tweaks: [
					[0x0c1ecf, [0x75]],
					[0x0c2b25, [0x75]]
				]
			},
			{ key: 'nameplateRange', type: 'float', offset: 0x40c448 },
			{ key: 'cameraDistance', type: 'float', offset: 0x4089a4 },
			{
				key: 'cameraSkipFix',
				type: 'bytes',
				tweaks: [
					[
						0x02ccd0,
						[
							0x55, 0x8b, 0x05, 0x48, 0x4e, 0x88, 0x00, 0x8b, 0x0d, 0x44, 0x4e,
							0x88, 0x00, 0xe9, 0x33, 0x90, 0x32, 0x00, 0x83, 0xc0, 0x32, 0x83,
							0xc1, 0x32, 0x3b, 0x0d, 0xa8, 0xeb, 0xc4, 0x00, 0x7e, 0x03, 0x83,
							0xe9, 0x01, 0x3b, 0x05, 0xac, 0xeb, 0xc4, 0x00, 0x7e, 0x03, 0x83,
							0xe8, 0x01, 0x83, 0xe9, 0x32, 0x83, 0xe8, 0x32, 0x89, 0x05, 0x48,
							0x4e, 0x88, 0x00, 0x89, 0x0d, 0x44, 0x4e, 0x88, 0x00, 0x5d, 0xeb,
							0x0d
						]
					],
					[0x02d326, [0xe9, 0xb1, 0x8a, 0x32, 0x00]],
					[0x02d334, [0x8b, 0x35, 0x48, 0x4e, 0x88, 0x00]],
					[
						0x355d15,
						[
							0x83, 0xf8, 0x32, 0x7d, 0x03, 0x83, 0xc0, 0x01, 0x83, 0xf9, 0x32,
							0x7d, 0x03, 0x83, 0xc1, 0x01, 0xe9, 0xb8, 0x6f, 0xcd, 0xff
						]
					],
					[
						0x355ddc,
						[
							0x8d, 0x4d, 0xf0, 0x51, 0xff, 0x35, 0x00, 0x4e, 0x88, 0x00, 0xff,
							0x15, 0x50, 0xf6, 0x7f, 0x00, 0x8b, 0x45, 0xf0, 0x8b, 0x15, 0x44,
							0x4e, 0x88, 0x00, 0xe9, 0x35, 0x75, 0xcd, 0xff
						]
					]
				]
			},
			{
				key: 'crossFactionResurrect' as never,
				type: 'bytes',
				tweaks: [
					[0x006e5fb8, [0x006e5fb9]],
					[0x006e62a8, [0x006e62a9]]
				]
			}
		] satisfies Tweak[];

		// Apply patches
		Tweaks.forEach(t => {
			const val =
				config[t.key] ?? t.default ?? ConfigWtfSchema.parse({})[t.key];

			Logger.log(`Applying "${t.key}" patch with value: ${val}`);
			if (t.type === 'float') {
				buffer.writeFloatLE(t.value ?? (val as never), t.offset);
			} else if (t.type === 'int8') {
				buffer.writeInt8(t.value ?? (val as never), t.offset);
			} else if (t.type === 'uint16') {
				buffer.writeUInt16LE(t.value ?? (val as never), t.offset);
			} else if (t.type === 'bytes') {
				t.tweaks.forEach(([offset, bytes]) =>
					Buffer.from(bytes).copy(buffer, offset)
				);
			}
		});

		// Write patches WoW.exe
		await fs.writeFile(exePath, buffer);
		Logger.log('WoW.exe successfully patched');
	} catch (e) {
		Logger.error('Failed to patch WoW.exe', e);
	}
};

export const patchConfig = async () => {
	const { clientDir, server, config } = Preferences.data;
	if (!clientDir) return;

	const configPath = path.join(clientDir, 'WTF', 'Config.wtf');
	const raw = await fs.readFile(configPath, { encoding: 'utf-8' });
	await fs.remove(configPath);

	const configWtf = Object.fromEntries(
		raw
			.split('\n')
			.map(l => {
				const [_, k, v] = l.match(/SET (\w+) "(.+)"/) ?? [];
				return !k || !v ? undefined : [k, v];
			})
			.filter(isNotUndef)
	);

	const primaryDisplay = screen.getPrimaryDisplay();
	const { width, height } = primaryDisplay.bounds;

	const parsed = {
		// Defaults
		scriptMemory: 512000,
		gxResolution: `${width}x${height}`,
		gxColorBits: primaryDisplay.colorDepth,
		gxDepthBits: primaryDisplay.colorDepth,
		gxRefresh: 60,
		gxMultisample: 8,
		gxMultisampleQuality: 0,
		gxTripleBuffer: 1,
		anisotropic: 16,
		frillDensity: 48,
		fullAlpha: 1,
		SmallCull: 0.01,
		DistCull: 888.8,
		shadowLevel: 0,
		trilinear: 1,
		specular: 1,
		pixelShaders: 1,
		M2UsePixelShaders: 1,
		particleDensity: 1,
		unitDrawDist: 300,
		weatherDensity: 3,
		movieSubtitle: 1,
		minimapZoom: 0,
		minimapInsideZoom: 0,
		SoundZoneMusicNoDelay: 1,
		// Parsed config
		...configWtf,
		// Tweaks
		CameraDistanceMax: config.cameraDistance,
		farClip: config.farClip,
		// Mandatory
		...Servers[server],
		hwDetect: 0, // Skip hardware change detection
		gxWindow: 1, // Maximized windowed mode
		gxMaximize: 1, // Maximized windowed mode
		gxCursor: 1, // Hardware cursor
		M2UseShaders: 1, // Vertex animation shader
		checkAddonVersion: 0 // Load out of date addons
	};

	await fs.writeFile(
		configPath,
		Object.entries(parsed)
			.filter(v => v[1] !== undefined && v[1] !== null)
			.map(l => `SET ${l[0]} "${l[1]}"`)
			.join('\n')
	);
	Logger.log('Config.wtf successfully patched');
};
