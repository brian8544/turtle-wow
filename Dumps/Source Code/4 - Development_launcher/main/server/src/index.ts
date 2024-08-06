import path from 'path';

import express from 'express';
import fs from 'fs-extra';
import { buildCache } from './cache.js';
import { addons } from './addons.js';

const SourceDir = 'C:\\WoW\\TurtleFresh';

const app = express();
const port = 5000;

app.get('/api/file/:version/manifest.json', async (_req, res) => {
	console.log(`Fetching manifest`);
	const filePath = path.join(SourceDir, 'manifest.json');
	if (!fs.existsSync(filePath)) await buildCache(SourceDir);

	res.json(await fs.readJSON(filePath));
});

app.get(
	'/api/file/:version/*',
	async (req: express.Request<{ 0: string }>, res) => {
		const filePath = req.params[0];
		console.log(`Fetching file: ${filePath}`);

		res.sendFile(path.join(SourceDir, filePath));
	}
);

app.get('/api/addons.json', async (_req, res) => {
	console.log(`Fetching addons`);
	res.json(addons);
});

app.listen(port, () => {
	console.log(`Server listening on port ${port}`);
});
