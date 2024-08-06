import { workerData, parentPort } from 'worker_threads';

import git, { status } from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs-extra';

const port = parentPort;
if (!port) throw new Error('IllegalState');

const { dir, remote, branch } = workerData;

const removeUntrackedFiles = async (dir: string) => {
	const status = await git.statusMatrix({ fs, dir });
	await Promise.all(
		status
			.filter(([_, HEAD]) => HEAD === 0)
			.map(([filepath]) => filepath)
			.map(filepath => fs.remove(`${dir}/${filepath}`))
	);
};

git
	.checkout({
		fs,
		dir,
		force: true,
		ref: `${remote}/${branch}`,
		onProgress: (...args) => port.postMessage({ cb: 'onProgress', args })
	})
	.then(() => git.statusMatrix({ fs, dir }))
	.then(status =>
		Promise.all(
			status
				.filter(([_, HEAD]) => HEAD === 0)
				.map(([filepath]) => filepath)
				.map(filepath => fs.remove(`${dir}/${filepath}`))
		)
	)
	.then(() =>
		git.pull({
			fs,
			http,
			dir,
			ref: branch,
			singleBranch: true,
			author: { name: 'Turtle Launcher' },
			onProgress: (...args) => port.postMessage({ cb: 'onProgress', args })
		})
	)
	.then(() => port.postMessage(true));
