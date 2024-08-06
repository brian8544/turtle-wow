import { type ReactNode, type PropsWithChildren } from 'react';
import {
	AlertOctagon,
	ExternalLink,
	X,
	AlertTriangle,
	Check,
	Dot,
	DownloadCloud
} from 'lucide-react';

import { type AddonData } from '~main/types';
import { api } from '~renderer/utils/api';
import TextButton from '~renderer/components/styled/TextButton';
import { ColoredText } from '~renderer/components/styled/ColoredText';
import useScrollHint from '~renderer/utils/useScrollHint';
import IconSpinner from '~renderer/components/styled/IconSpinner';
import CloseButton from '~renderer/components/styled/CloseButton';

import { type LocalDependencies } from './AddonListItem';

const AddonDetailItem = ({
	name,
	children
}: PropsWithChildren<{ name: string }>) =>
	children ? (
		<div className="s1 pl-4 -indent-4 text-blueGray">
			{name}:{' '}
			{typeof children === 'string' ? (
				<ColoredText className="inline">{children}</ColoredText>
			) : (
				children
			)}
		</div>
	) : null;

type Props = AddonData & {
	close: () => void;
	warnings: { full: ReactNode; short: ReactNode }[];
	dependencies: LocalDependencies;
};

const AddonDetail = ({ close, warnings, dependencies, ...addon }: Props) => {
	const openLink = api.general.openLink.useMutation();
	const update = api.addons.update.useMutation();

	const scrollRef = useScrollHint<HTMLDivElement>();

	return (
		<div
			ref={scrollRef}
			className="tw-surface flex max-h-[calc(100vh_-_256px)] w-full max-w-md flex-col gap-3 overflow-y-auto"
		>
			<CloseButton close={close} />
			<ColoredText className="text-2xl">
				{addon.toc?.Title ?? addon.folder}
			</ColoredText>
			<hr />
			{addon.error && (
				<p className="s1 text-red">
					<AlertOctagon size={14} className="inline text-inherit" />{' '}
					{addon.error}
				</p>
			)}
			{warnings.map((w, i) => (
				<p key={i} className="s1 text-yellow">
					<AlertTriangle size={14} className="inline text-inherit" /> {w.full}
				</p>
			))}
			{addon.toc && (
				<>
					<p>{addon.toc.Notes}</p>
					<div>
						<AddonDetailItem name="Source">
							{addon.git && (
								<TextButton
									onClick={() => openLink.mutateAsync(addon.git)}
									className="s1 -m-2 !inline"
								>
									Open on GitHub
									<ExternalLink size={12} className="ml-1 inline" />
								</TextButton>
							)}
						</AddonDetailItem>
						<AddonDetailItem name="Contributions">
							{addon.toc.Author}
						</AddonDetailItem>
						<AddonDetailItem name="Addon version">
							{addon.toc.Version}
						</AddonDetailItem>
						<AddonDetailItem name="Dependencies">
							{!!dependencies.length && (
								<ul className="pl-2">
									{dependencies.map(({ name, optional, status }) => (
										<li key={name}>
											{status === 'installed' ? (
												<Check size={16} className="inline text-darkGreen" />
											) : status === 'available' ? (
												<TextButton
													title="Download"
													icon={DownloadCloud}
													size={16}
													onClick={() =>
														update.mutateAsync({ toUpdate: [name] })
													}
													className="-m-2 !inline text-warmGreen"
												/>
											) : status === 'missing' ? (
												optional ? (
													<Dot size={16} className="inline text-blueGray" />
												) : (
													<X size={16} className="inline text-red" />
												)
											) : (
												<IconSpinner size={16} className="inline" />
											)}
											<p className="inline"> {name} </p>
											{!['installed', 'available', 'missing'].includes(
												status
											) ? (
												<p className="s1 inline text-blueGray">{status}</p>
											) : optional ? (
												<p className="s1 inline text-blueGray">(optional)</p>
											) : null}
										</li>
									))}
								</ul>
							)}
						</AddonDetailItem>
					</div>
				</>
			)}
		</div>
	);
};
export default AddonDetail;
