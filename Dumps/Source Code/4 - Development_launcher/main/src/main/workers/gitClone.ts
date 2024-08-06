import { workerData, parentPort } from 'worker_threads';

import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs-extra';

const port = parentPort;
if (!port) throw new Error('IllegalState');

const { dir, url, ref } = workerData;

fs.removeSync(dir);
git
	.clone({
		dir,
		fs,
		http,
		url,
		ref,
		singleBranch: true,
		onProgress: (...args) => port.postMessage({ cb: 'onProgress', args })
	})
	.then(() => port.postMessage(true));
