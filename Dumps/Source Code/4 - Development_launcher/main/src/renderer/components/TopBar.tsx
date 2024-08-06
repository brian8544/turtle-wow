import { Menu, Minus, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { api } from '~renderer/utils/api';

import DialogButton from './styled/DialogButton';
import PreferencesDialog from './PreferencesDialog';
import TextButton from './styled/TextButton';

const TopBar = () => {
	const [safeToQuit, setSafeToQuit] = useState(true);
	api.updater.observe.useSubscription(undefined, {
		onData: ({ state }) =>
			setSafeToQuit(state !== 'verifying' && state !== 'updating')
	});

	// Window drag
	const [dragging, setDragging] = useState(false);
	const dragWindow = api.general.dragWindow.useMutation();

	useEffect(() => {
		const dragCallback = (e: MouseEvent) => {
			dragging && dragWindow.mutate({ x: e.movementX, y: e.movementY });
		};
		const endCallback = (e: MouseEvent) => {
			dragging && e.buttons === 0 && setDragging(false);
		};
		window.addEventListener('mousemove', dragCallback);
		window.addEventListener('mouseup', endCallback);
		return () => {
			window.removeEventListener('mousemove', dragCallback);
			window.removeEventListener('mouseup', endCallback);
		};
	}, [dragWindow]);

	const minimize = api.general.minimize.useMutation();
	const quit = api.general.quit.useMutation();
	return (
		// eslint-disable-next-line jsx-a11y/no-static-element-interactions
		<div
			onMouseDown={e =>
				e.target === e.currentTarget && e.buttons === 1 && setDragging(true)
			}
			className="absolute left-0 right-0 top-0 flex justify-end pr-2 pt-2 opacity-50"
		>
			<DialogButton dialog={close => <PreferencesDialog close={close} />}>
				{open => (
					<TextButton
						icon={Menu}
						title="Settings"
						onClick={open}
						size={16}
						className="!p-1"
					/>
				)}
			</DialogButton>
			<TextButton
				icon={Minus}
				title="Minimize"
				onClick={() => minimize.mutateAsync()}
				size={16}
				className="!p-1"
			/>
			<DialogButton
				dialog={close => (
					<div className="tw-dialog">
						<h3 className="tw-color">Quit?</h3>
						<hr />
						<p className="text-blueGray">
							Your game is currently being updated. Quitting now may cause
							problems.
						</p>
						<div className="flex gap-2 self-end">
							<TextButton onClick={close}>Return</TextButton>
							<TextButton
								onClick={() => quit.mutateAsync()}
								className="text-red"
							>
								Quit
							</TextButton>
						</div>
					</div>
				)}
			>
				{open => (
					<TextButton
						icon={X}
						title="Quit"
						onClick={() => (!safeToQuit ? open() : quit.mutateAsync())}
						size={16}
						className="!p-1 hocus:text-red"
					/>
				)}
			</DialogButton>
		</div>
	);
};

export default TopBar;
