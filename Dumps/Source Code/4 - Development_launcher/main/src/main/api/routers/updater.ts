import { z } from 'zod';

import Updater from '~main/modules/updater';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const updaterRouter = createTRPCRouter({
	verify: publicProcedure.mutation(() => Updater.verify()),
	update: publicProcedure
		.input(z.boolean().optional())
		.mutation(async ({ input }) => Updater.update(input)),
	observe: publicProcedure.subscription(() => Updater.observe())
});
