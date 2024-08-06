import { useState } from 'react';
import { Plus, RefreshCw, Search } from 'lucide-react';

import { type AddonData, type AddonsStatus } from '~main/types';
import { api } from '~renderer/utils/api';
import TextButton from '~renderer/components/styled/TextButton';
import useScrollHint from '~renderer/utils/useScrollHint';

import DialogButton from '../styled/DialogButton';
import IconSpinner from '../styled/IconSpinner';

import AddonList from './addons/AddonList';
import { type Dependencies } from './addons/AddonListItem';
import CustomAddonDialog from './addons/CustomAddonDialog';

const localeFilter = (l: AddonData[], filter: string) =>
	l
		.filter(
			a =>
				a.folder.toLocaleLowerCase().indexOf(filter.toLocaleLowerCase()) !== -1
		)
		.sort((a, b) => a.folder.localeCompare(b.folder));

const AddonsTab = () => {
	const [data, setData] = useState<AddonsStatus>({
		state: 'verifying',
		addons: {},
		available: []
	});
	api.addons.observe.useSubscription(undefined, { onData: setData });

	const isUpdateAvailable = Object.values(data.addons).some(
		a => a.status === 'outOfDate' || a.status === 'downloading'
	);
	const dependencies: Dependencies = Object.fromEntries([
		...data.available.map(a => [a.folder, 'available']),
		...Object.values(data.addons).map(a => [
			a.folder,
			a.progress ?? (a.status === 'upToDate' ? 'installed' : 'available')
		])
	]);

	const [filter, setFilter] = useState('');

	const verify = api.addons.verify.useMutation();
	const update = api.addons.update.useMutation();

	const scrollRef = useScrollHint<HTMLDivElement>();

	return (
		<div className="tw-surface relative flex min-h-0 flex-grow flex-col gap-3">
			<div
				ref={scrollRef}
				className="relative -m-4 -mb-3 flex flex-grow flex-col gap-3 overflow-y-auto overflow-x-hidden p-4 pb-3"
			>
				<AddonList
					title="Installed"
					addons={localeFilter(Object.values(data.addons), filter)}
					dependencies={dependencies}
				/>
				<AddonList
					title="Available"
					addons={localeFilter(
						data.available.filter(a => !(a.folder in data.addons)),
						filter
					)}
					dependencies={dependencies}
				/>
			</div>
			<hr />
			<div className="-mb-4 -mt-3 grid grid-cols-[1fr_1fr_1fr] items-center justify-between gap-2 py-2">
				<TextButton
					onClick={() => verify.mutateAsync()}
					className="-ml-2 text-blueGray"
					icon={RefreshCw}
					size={18}
					loading={data.state !== 'done'}
				>
					Check for updates
				</TextButton>
				<DialogButton
					clickAway
					dialog={close => <CustomAddonDialog close={close} />}
				>
					{open => (
						<TextButton
							icon={Plus}
							size={18}
							onClick={open}
							className="s1 text-pink"
						>
							Add custom git addon
						</TextButton>
					)}
				</DialogButton>
				{data.state === 'verifying' ? (
					<IconSpinner size={18} className="justify-self-end" />
				) : isUpdateAvailable ? (
					<TextButton
						onClick={() => update.mutateAsync({})}
						className="justify-self-end text-warmGreen"
					>
						Update all
					</TextButton>
				) : (
					<p className="s1 justify-self-end text-blueGray">
						Everything is up to date.
					</p>
				)}
			</div>
			<div className="absolute right-3 top-3">
				<div className="flex items-center gap-1 border-b border-blueGray bg-darkGray/70 p-1 hocus:border-orange">
					<input
						className="cursor-text bg-inherit"
						value={filter}
						onChange={e => setFilter(e.target.value)}
					/>
					<Search size={18} />
				</div>
			</div>
		</div>
	);
};
export default AddonsTab;
