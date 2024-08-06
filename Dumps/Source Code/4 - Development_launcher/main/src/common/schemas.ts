import { z } from 'zod';

/**
 * Zod type wrappers for use with form inputs
 */
const f = {
	boolean: (defaultValue?: boolean) =>
		z.boolean().nullish().default(!!defaultValue),
	number: (defaultValue?: number, val?: (v: z.ZodNumber) => z.ZodNumber) =>
		z.preprocess(
			v =>
				v === '' || v === undefined
					? defaultValue ?? null
					: typeof v === 'string'
					? Number(v)
					: v,
			(val?.(z.number()) ?? z.number()).nullish()
		)
};

export const ConfigWtfSchema = z.object({
	vanillaFixes: f.boolean(),
	largeAddress: f.boolean(true),
	nameplateRange: f.number(41),
	alwaysAutoLoot: f.boolean(),
	fieldOfView: f.number(110),
	farClip: f.number(777),
	frillDistance: f.number(70),
	cameraSkipFix: f.boolean(true),
	cameraDistance: f.number(50),
	soundInBackground: f.boolean(true)
});
export type ConfigWtfSchema = z.infer<typeof ConfigWtfSchema>;

export const PreferencesSchema = z.object({
	isPortable: z.boolean().optional(),
	server: z.enum(['live', 'ptr']).default('live'),
	clientDir: z.string().optional(),
	version: z.string().optional(),
	reopenLauncher: f.boolean(),
	cleanWdb: f.boolean(),
	rememberPosition: f.boolean(),
	windowPosition: z
		.object({
			x: z.number(),
			y: z.number(),
			width: z.number(),
			height: z.number()
		})
		.nullish(),
	config: ConfigWtfSchema.default({})
});
export type PreferencesSchema = z.infer<typeof PreferencesSchema>;

export const TocDataSchema = z.object({
	Interface: z.string(),
	Title: z.string(),
	Author: z.string(),
	Notes: z.string(),
	Version: z.string(),
	Dependencies: z.string().optional(),
	OptionalDeps: z.string().optional()
});

export type TocData = z.infer<typeof TocDataSchema>;

export const AddonDataSchema = z.object({
	status: z.enum([
		'available',
		'fetching',
		'unknown',
		'upToDate',
		'outOfDate',
		'downloading',
		'invalid'
	]),
	git: z.string().optional(),
	toc: TocDataSchema.optional(),
	error: z.string().optional(),
	branch: z.string().optional(),
	folder: z.string(),
	progress: z.string().optional(),
	preview: z.string().optional()
});

export type AddonData = z.infer<typeof AddonDataSchema>;
