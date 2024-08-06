import { notFound } from 'next/navigation';

import { getItemById } from '~/server/api/items';

type Props = {
	params: { id: number };
};

const Page = async ({ params }: Props) => {
	const item = await getItemById(params.id);
	if (!item) return notFound();

	return (
		<>
			<div>TODO: Breadcrumbs</div>
			<div className="tw-surface flex flex-col gap-2">
				<div className="flex gap-3">
					<div className="flex grow flex-col gap-2">
						<h3>{item.name}</h3>
						<hr />
						<div>TODO: Item preview</div>
					</div>

					<div className="tw-surface flex min-w-[400px] flex-col">
						<div className="pb-2 font-fontin uppercase">Quick Facts</div>

						<div>Level: {item.item_level}</div>
					</div>
				</div>

				<h4 className="mt-4">Related</h4>
				<hr />
				<div className="flex flex-col">
					{/* TODO: Tabs */}
					<div className="flex gap-1 px-2">
						<div className="tw-surface border-b-0">Tab 1 </div>
						<div className="tw-surface border-b-0">Tab 2 </div>
					</div>
					<div className="tw-surface">TODO: Table</div>
				</div>
			</div>
		</>
	);
};

export default Page;
