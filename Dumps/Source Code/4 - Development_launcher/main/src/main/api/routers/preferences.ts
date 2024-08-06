import { z } from 'zod';

import { PreferencesSchema } from '~common/schemas';
import Preferences from '~main/modules/preferences';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const preferencesRouter = createTRPCRouter({
	get: publicProcedure.output(PreferencesSchema).query(() => Preferences.data),
	set: publicProcedure
		.input(PreferencesSchema.partial())
		.mutation(async ({ input }) => {
			Preferences.data = input;
			return Preferences.data;
		}),
	isValidClientDir: publicProcedure
		.input(z.string().optional())
		.query(({ input }) => Preferences.isValidClientDir(input))
});
