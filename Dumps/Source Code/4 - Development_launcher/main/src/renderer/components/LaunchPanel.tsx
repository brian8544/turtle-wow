import { useState, type ReactElement } from 'react';
import cls from 'classnames';

import { type UpdaterStatus } from '~main/types';
import { api } from '~renderer/utils/api';

import Button from './styled/Button';
import DialogButton from './styled/DialogButton';
import ClientDirDialog from './ClientDirDialog';

const LaunchPanel = () => {
	const [status, setStatus] = useState<UpdaterStatus>({ state: 'verifying' });
	api.updater.observe.useSubscription(undefined, {
		onData: data => {
			console.log({ data });
			setStatus(data);
		},
		onError: err => console.log({ err }),
		onStarted: () => console.log('Started')
	});

	const { data: pref } = api.preferences.get.useQuery();

	const verify = api.updater.verify.useMutation();
	const update = api.updater.update.useMutation();
	const start = api.launcher.start.useMutation();

	const props: Record<
		UpdaterStatus['state'],
		{ button: ReactElement; helperText?: ReactElement }
	> = {
		verifying: { button: <Button disabled>Verifying</Button> },
		serverUnreachable: {
			button: pref?.version ? (
				<Button onClick={() => start.mutateAsync()}>Play</Button>
			) : (
				<Button onClick={() => verify.mutateAsync()}>Retry</Button>
			),
			helperText: (
				<div className="-mb-2">
					<p>
						<span className="text-orange">Error: </span> Failed to reach update
						server
					</p>
					<p className="s1 text-blueGray">
						{pref?.version
							? `You can launch local version ${pref?.version}`
							: 'Please try again later'}
					</p>
				</div>
			)
		},
		noClient: {
			button: (
				<DialogButton
					clickAway
					dialog={close => <ClientDirDialog close={close} />}
				>
					{open => (
						<Button primary onClick={open}>
							Install
						</Button>
					)}
				</DialogButton>
			)
		},
		updateAvailable: {
			button: <Button onClick={() => update.mutateAsync()}>Update</Button>,
			helperText: (
				<div className="-mb-2">
					<p>Update available!</p>
					<p className="s1 text-blueGray">
						With total download size{' '}
						<span className="s1 break-all">{status.message}</span>
					</p>
				</div>
			)
		},
		updating: { button: <Button disabled>Updating</Button> },
		upToDate: {
			button: (
				<Button primary onClick={() => start.mutateAsync()}>
					Play
				</Button>
			),
			helperText: (
				<div className="-mb-2">
					<p>Everything up to date!</p>
					<p className="s1 text-blueGray">Version: {pref?.version}</p>
				</div>
			)
		},
		failed: {
			button: <Button onClick={() => verify.mutateAsync()}>Retry</Button>,
			helperText: (
				<div className="-mb-2">
					<p>
						<span className="text-orange">Error: </span>
						{status.message}
					</p>
					<p className="s1 text-blueGray">
						Verify your game data by clicking Retry.
					</p>
				</div>
			)
		}
	};

	return (
		<div className="flex gap-3">
			<div className="flex flex-grow flex-col justify-end gap-3">
				{props[status.state].helperText ??
					(status.message && (
						<p className="s1 -mb-2 text-blueGray">{status.message}</p>
					))}
				<div className="tw-loading-wrapper">
					{status.progress !== undefined && (
						<div
							className={cls('tw-loading', {
								'tw-loading-unknown': status.progress === -1
							})}
							style={
								status.progress !== -1
									? {
											clipPath: `inset(0 ${
												100 - Math.ceil(Math.abs(status.progress) * 100)
											}% 0 0)`
									  }
									: undefined
							}
						/>
					)}
				</div>
			</div>
			{props[status.state].button}
		</div>
	);
};

export default LaunchPanel;
