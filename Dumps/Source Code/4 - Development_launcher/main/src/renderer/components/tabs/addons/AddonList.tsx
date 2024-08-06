import { type AddonData } from '~main/types';

import AddonListItem, { type Dependencies } from './AddonListItem';

type Props = {
	title: string;
	addons: AddonData[];
	dependencies: Dependencies;
};

const AddonList = ({ title, addons, dependencies }: Props) =>
	addons.length ? (
		<details open>
			<summary className="mb-2 cursor-pointer">
				<h4 className="tw-color cursor-[inherit]">{title}</h4>
			</summary>
			<div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-x-3 gap-y-1">
				{addons.map((addon, i) => (
					<AddonListItem
						key={addon.folder}
						row={i}
						dependencies={dependencies}
						{...addon}
					/>
				))}
			</div>
		</details>
	) : null;
export default AddonList;
