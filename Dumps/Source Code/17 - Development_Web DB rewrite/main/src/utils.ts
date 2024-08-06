import { type Resolver, type FieldValues } from 'react-hook-form';
import type { z } from 'zod';
import { zodResolver as resolver } from '@hookform/resolvers/zod';

export const zodResolver = <In extends FieldValues, Out extends FieldValues>(
	schema: z.ZodType<In, z.ZodTypeDef, Out>
): Resolver<z.infer<z.ZodType<In, z.ZodTypeDef, Out>>> => resolver(schema);

export const downloadBlob = (blob: Blob, title: string) => {
	const url = window.URL.createObjectURL(blob);
	const link = document.createElement('a');

	link.href = url;
	link.download = title;

	link.click();
};

export const getLastUpdatedString = (date: Date) => {
	if (!date) return 'Never';
	const now = new Date();
	const diff = now.getTime() - new Date(date).getTime();
	const days = Math.floor(diff / (1000 * 60 * 60 * 24));
	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor(diff / (1000 * 60));
	const plural = (n: number) => (n === 1 ? '' : 's');
	if (days > 0) return `${days} day${plural(days)} ago`;
	if (hours > 0) return `${hours} hour${plural(hours)} ago`;
	if (minutes > 0) return `${minutes} minute${plural(minutes)} ago`;
	return `<1 minute ago`;
};

export const classMask = {
	1: { name: 'Warrior', icon: 'classicon_warrior', color: '#C79C6E' },
	2: { name: 'Paladin', icon: 'classicon_paladin', color: '#F58CBA' },
	4: { name: 'Hunter', icon: 'classicon_hunter', color: '#ABD473' },
	8: { name: 'Rogue', icon: 'classicon_rogue', color: '#FFF569' },
	16: { name: 'Priest', icon: 'classicon_priest', color: '#FFFFFF' },
	64: { name: 'Shaman', icon: 'classicon_shaman', color: '#0070DE' },
	128: { name: 'Mage', icon: 'classicon_mage', color: '#40C7EB' },
	256: { name: 'Warlock', icon: 'classicon_warlock', color: '#8787ED' },
	1024: { name: 'Druid', icon: 'classicon_druid', color: '#FF7D0A' }
} as const;

export const maskToClass = (mask?: number) =>
	classMask[mask as never] as
		| (typeof classMask)[keyof typeof classMask]
		| undefined;
