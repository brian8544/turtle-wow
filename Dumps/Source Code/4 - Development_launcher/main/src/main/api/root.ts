import { createTRPCRouter } from './trpc';
import { addonsRouter } from './routers/addonts';
import { launcherRouter } from './routers/launcher';
import { updaterRouter } from './routers/updater';
import { patcherRouter } from './routers/patcher';
import { generalRouter } from './routers/general';
import { preferencesRouter } from './routers/preferences';

export const appRouter = createTRPCRouter({
	addons: addonsRouter,
	general: generalRouter,
	preferences: preferencesRouter,
	launcher: launcherRouter,
	patcher: patcherRouter,
	updater: updaterRouter
});

export type AppRouter = typeof appRouter;
