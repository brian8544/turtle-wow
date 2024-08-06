import { z } from 'zod';

import Addons from '~main/modules/addons';
import { AddonDataSchema } from '~common/schemas';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const addonsRouter = createTRPCRouter({
	verify: publicProcedure.mutation(() => {
		Addons.verify();
	}),
	update: publicProcedure
		.input(z.object({ toUpdate: z.array(z.string()).optional() }))
		.mutation(({ input }) => Addons.update(input.toUpdate)),
	install: publicProcedure
		.input(AddonDataSchema)
		.mutation(({ input }) => Addons.install(input)),
	remove: publicProcedure
		.input(z.object({ toDelete: z.array(z.string()) }))
		.mutation(({ input }) => Addons.remove(input.toDelete)),
	checkGitUrl: publicProcedure
		.input(z.string())
		.query(({ input }) => Addons.checkGitUrl(input)),
	observe: publicProcedure.subscription(() => Addons.observe())
});
