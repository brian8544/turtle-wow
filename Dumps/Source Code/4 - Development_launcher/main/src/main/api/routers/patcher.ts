import { patchConfig, patchExecutable } from '~main/modules/patcher';
import Preferences from '~main/modules/preferences';
import { getClientVersion } from '~main/utils';

import { createTRPCRouter, publicProcedure } from '../trpc';

export const patcherRouter = createTRPCRouter({
	apply: publicProcedure.mutation(async () => {
		await patchExecutable();
		await patchConfig();
		Preferences.data = { version: await getClientVersion() };
	})
});
