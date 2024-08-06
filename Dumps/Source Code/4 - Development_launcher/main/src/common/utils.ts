type Path = readonly (string | number)[];

export const nestedGet = <T>(object: unknown, path: Path) =>
	path.reduce((obj, key) => obj?.[key], object) as T;

export const nestedSet = (obj: any, path: Path, value: unknown) => {
	const [key, ...rest] = path;
	if (path.length === 1) {
		obj[key] = value;
		return;
	}

	if (obj[key] === undefined) {
		obj[key] = typeof rest[0] === 'number' ? [] : {};
	}

	nestedSet(obj[key], rest as never, value);
};

export const asyncReduce = async <T, U>(
	arr: T[],
	reducer: (acc: U, cur: T) => Promise<U>,
	init: U
): Promise<U> => {
	let acc: U = init;
	for (const i of arr) acc = await reducer(acc, i);
	return acc;
};

export const asyncMap = async <T, U>(
	arr: T[],
	map: (cur: T) => Promise<U>
): Promise<U[]> => {
	const acc: U[] = [];
	for (const i of arr) acc.push(await map(i));
	return acc;
};

export const isNotUndef = <T>(obj: T): obj is Exclude<T, undefined> =>
	obj !== undefined;

export const formatFileSize = (bytes: number) => {
	const units = ['B', 'KB', 'MB', 'GB', 'TB'];
	let size = bytes;
	let unitIndex = 0;

	while (size >= 1024 && unitIndex < units.length - 1) {
		size /= 1024;
		unitIndex++;
	}

	return `${size.toFixed(2)} ${units[unitIndex]}`;
};

export const formatDuration = (remaining: number) => {
	const hours = Math.floor(remaining / 3600);
	const minutes = Math.floor((remaining % 3600) / 60);
	const seconds = Math.floor(remaining % 60);

	return `${hours ? `${hours}h ` : ''}${
		minutes ? `${minutes}m ` : ''
	}${seconds}s`;
};

export const omit = <T extends object, const K extends keyof T>(
	obj: T,
	keys: K[]
): Omit<T, K> => {
	const result = { ...obj };
	keys.forEach(key => {
		delete result[key];
	});
	return result;
};
