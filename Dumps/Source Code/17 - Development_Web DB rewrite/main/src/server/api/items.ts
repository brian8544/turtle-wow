'use server';

import { db } from '../db';

export const getItemById = async (id: number) =>
	db.query.item_template.findFirst({
		where: (t, { eq }) => eq(t.entry, id)
	});
