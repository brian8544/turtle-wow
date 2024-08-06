import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { FolderPen } from 'lucide-react';

import { PreferencesSchema } from '~common/schemas';
import { api } from '~renderer/utils/api';
import zodResolver from '~renderer/utils/zodResolver';

import TextButton from './styled/TextButton';
import CheckboxInput from './form/CheckboxInput';
import DialogButton from './styled/DialogButton';
import ClientDirDialog from './ClientDirDialog';
import RadioInput from './form/RadioInput';
import CloseButton from './styled/CloseButton';

const VerifyIcon = () => (
	<svg
		width="14"
		height="16"
		viewBox="0 0 14 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M13.4925 3.00026C13.4925 2.87828 13.4519 2.82407 13.3434 2.7789C11.2744 1.86183 9.20987 0.940247 7.14082 0.0276983C7.0595 -0.00844218 6.93753 -0.00844218 6.86073 0.0231808C4.78265 0.940247 2.70457 1.86635 0.626492 2.78793C0.527105 2.83311 0.5 2.8828 0.5 2.99122C0.504518 3.75921 0.504518 4.52268 0.504518 5.29066C0.504518 5.86891 0.509035 6.45168 0.504518 7.02992C0.490965 8.81436 0.951757 10.4723 1.90045 11.9857C3.07049 13.8695 4.6923 15.1977 6.86525 15.794C6.94657 15.8166 7.04595 15.8166 7.12727 15.794C7.81394 15.6178 8.46898 15.3603 9.0653 14.9808C11.9249 13.1648 13.3841 10.5446 13.479 7.17449C13.5196 5.78759 13.488 4.39167 13.4925 3.00026ZM6.07016 11.3397L2.72716 7.99668L4.23603 6.48782L6.05209 8.34454L9.89654 4.50009L11.4099 5.9954L6.07016 11.3397Z"
			fill="url(#paint0_linear_3007_11588)"
		/>
		<defs>
			<linearGradient
				id="paint0_linear_3007_11588"
				x1="7"
				y1="0"
				x2="7"
				y2="15.8109"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#C4CB63" />
				<stop offset="1" stopColor="#72B840" />
			</linearGradient>
		</defs>
	</svg>
);
VerifyIcon.$$typeof = Symbol.for('react.element');

const CleanIcon = () => (
	<svg
		width="14"
		height="15"
		viewBox="0 0 14 15"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M7.00308 0.5C3.13166 0.5 0 3.62687 0 7.5C0 11.3731 3.13166 14.5 6.99692 14.5C10.8683 14.5 14 11.367 14 7.5C14 3.62687 10.8745 0.5 7.00308 0.5ZM10.4738 8.28943L10.295 8.46828C9.43197 9.33172 8.54425 10.226 7.6627 11.1018C7.47776 11.2868 7.23734 11.3793 7.00308 11.3793C6.76266 11.3793 6.52224 11.2806 6.33113 11.0894C5.36328 10.1273 4.42008 9.1837 3.53236 8.28943C3.16248 7.91322 3.15632 7.32731 3.53236 6.9511C3.90225 6.58106 4.48789 6.58106 4.8701 6.9511C5.27081 7.34582 5.67151 7.7467 6.05989 8.14141V7.44449C6.05989 6.57489 6.05989 5.71145 6.05989 4.84185C6.05989 4.4533 6.23866 4.15727 6.57155 3.98458C6.88595 3.82423 7.21885 3.84273 7.52092 4.03392C7.79833 4.21278 7.94628 4.49648 7.94628 4.83568C7.94628 5.15639 7.94628 5.48326 7.94628 5.80397V8.14141C8.32849 7.75286 8.72919 7.35815 9.1299 6.95727C9.40731 6.6859 9.7587 6.60573 10.1286 6.73524C10.48 6.86476 10.7019 7.14846 10.7389 7.53084C10.7697 7.82687 10.6772 8.0859 10.4738 8.28943Z"
			fill="#FF7757"
		/>
	</svg>
);
CleanIcon.$$typeof = Symbol.for('react.element');

type SectionProps = {
	title: string;
	children: React.ReactNode;
};

const Section = ({ title, children }: SectionProps) => (
	<div className="flex flex-col">
		<h4 className="tw-color">{title}</h4>
		{children}
	</div>
);

type Props = { close: () => void };

const PreferencesDialog = ({ close }: Props) => {
	const { data: pref } = api.preferences.get.useQuery();
	const setPref = api.preferences.set.useMutation();

	const verify = api.updater.verify.useMutation();
	const update = api.updater.update.useMutation();

	const { handleSubmit, watch, formState, setValue, reset } = useForm({
		defaultValues: pref ?? {},
		resolver: zodResolver(PreferencesSchema)
	});

	// Form reset
	useEffect(() => {
		pref && reset(pref);
	}, [reset, pref]);

	return (
		<form
			className="tw-dialog whitespace-nowrap"
			onSubmit={handleSubmit(async v => {
				await setPref.mutateAsync(v);
				close();
			})}
		>
			<CloseButton
				close={() => {
					reset();
					close();
				}}
			/>
			<h3 className="tw-color">Settings</h3>
			<hr className="mb-2" />

			<Section title="Launcher">
				<CheckboxInput
					value={!!watch('reopenLauncher')}
					setValue={v =>
						setValue('reopenLauncher', v, {
							shouldTouch: true,
							shouldDirty: true,
							shouldValidate: true
						})
					}
					label="Reopen launcher after WoW closes"
				/>
				<CheckboxInput
					value={!!watch('rememberPosition')}
					setValue={v =>
						setValue('rememberPosition', v, {
							shouldTouch: true,
							shouldDirty: true,
							shouldValidate: true
						})
					}
					label="Remember position & size of launcher window"
				/>
			</Section>

			<Section title="Game">
				<div className="flex w-full items-center gap-2 pl-2">
					<span className="shrink-0">Install directory:</span>
					<span
						title={pref?.clientDir}
						className="min-w-0 shrink grow overflow-hidden text-ellipsis text-blueGray"
					>
						{pref?.clientDir ? pref?.clientDir : 'Not selected'}
					</span>
					<DialogButton
						dialog={closeInner => (
							<ClientDirDialog
								close={() => {
									closeInner();
									close();
								}}
							/>
						)}
						clickAway={pref?.isPortable}
					>
						{open => (
							<TextButton icon={FolderPen} onClick={open}>
								Change
							</TextButton>
						)}
					</DialogButton>
				</div>

				<div className="flex items-center gap-3 pl-2">
					<span>Server:</span>
					<RadioInput
						value={watch('server')}
						setValue={v =>
							setValue('server', v, {
								shouldTouch: true,
								shouldDirty: true,
								shouldValidate: true
							})
						}
						options={[
							{ label: 'Live', value: 'live' },
							{ label: 'PTR', value: 'ptr' }
						]}
					/>
				</div>
				<CheckboxInput
					value={!!watch('cleanWdb')}
					setValue={v =>
						setValue('cleanWdb', v, {
							shouldTouch: true,
							shouldDirty: true,
							shouldValidate: true
						})
					}
					label="Clean WDB on each launch"
				/>
			</Section>

			<Section title="Troubleshooting">
				<div className="flex gap-3">
					<TextButton
						icon={VerifyIcon}
						onClick={() => verify.mutateAsync().then(close)}
						className="text-warmGreen underline"
					>
						Verify local files
					</TextButton>

					<DialogButton
						clickAway
						dialog={closeInner => (
							<div className="tw-dialog">
								<CloseButton close={closeInner} />
								<h3 className="tw-color">Warning!</h3>
								<hr />
								<p>Are you sure you want to continue?</p>
								<p>
									This will replace ALL your local files like addons and account
									config, and download whole client again!
								</p>
								<TextButton
									icon={CleanIcon}
									onClick={async () => {
										await update.mutateAsync(true);
										closeInner();
										close();
									}}
									className="self-end text-pink"
								>
									Delete ALL local files and download fresh!
								</TextButton>
							</div>
						)}
					>
						{open => (
							<TextButton
								icon={CleanIcon}
								onClick={open}
								className="text-pink underline"
							>
								Clean re-install
							</TextButton>
						)}
					</DialogButton>
				</div>
			</Section>

			<TextButton
				type="submit"
				loading={formState.isSubmitting}
				className="self-end text-green"
			>
				Save
			</TextButton>
		</form>
	);
};

export default PreferencesDialog;
