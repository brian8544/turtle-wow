import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { PreferencesSchema } from '~common/schemas';
import zodResolver from '~renderer/utils/zodResolver';
import { api } from '~renderer/utils/api';

import TextButton from './styled/TextButton';
import FilePickerInput from './form/FilePickerInput';
import CloseButton from './styled/CloseButton';

type Props = { close: () => void };

const ClientDirDialog = ({ close }: Props) => {
	const { data: pref } = api.preferences.get.useQuery();
	const setPref = api.preferences.set.useMutation();
	const isValidClientDir = api.preferences.isValidClientDir.useQuery(
		pref?.clientDir,
		{ enabled: !!pref?.isPortable }
	);

	const verify = api.updater.verify.useMutation();

	const {
		register,
		handleSubmit,
		watch,
		formState,
		setValue,
		setError,
		reset
	} = useForm({
		defaultValues: { clientDir: pref?.clientDir ?? '' },
		resolver: zodResolver(PreferencesSchema.pick({ clientDir: true }))
	});

	// Form reset
	useEffect(() => {
		pref && reset(pref);
	}, [reset, pref]);

	if (pref?.isPortable) {
		return (
			<form className="tw-dialog">
				<CloseButton close={close} />
				<h2 className="color mb-2 text-xl">Install location</h2>
				<p>
					You are using the portable version of the launcher. Install location
					is determined by the location of the launcher executable.
				</p>
				{!isValidClientDir.isLoading && !isValidClientDir.data && (
					<p>
						<span className="text-secondary">Error: </span>
						WoW.exe not found in current folder. Please close the launcher and
						move it to your WoW Wrath of the Lich King client directory.
					</p>
				)}
			</form>
		);
	}

	return (
		<form
			className="tw-dialog"
			onSubmit={handleSubmit(async ({ clientDir }) => {
				try {
					await setPref.mutateAsync({ clientDir });
					verify.mutateAsync();
					close();
				} catch (e) {
					setError('clientDir', {
						message: e instanceof Error ? e.message : JSON.stringify(e)
					});
				}
			})}
		>
			<CloseButton
				close={() => {
					reset();
					close();
				}}
			/>
			<h3 className="tw-color">Install location</h3>
			<hr />

			<p className="text-blueGray">
				Select a directory for the game client installation.
			</p>
			<p className="text-blueGray">
				You may also choose a directory with an existing Turtle WoW or Vanilla
				WoW installation, and it will be automatically upgraded.
			</p>
			<div className="flex items-center gap-3">
				<label htmlFor="clientDir">Install directory:</label>
				<FilePickerInput
					{...register('clientDir')}
					title={watch('clientDir') ?? undefined}
					setValue={v =>
						setValue('clientDir', v, {
							shouldTouch: true,
							shouldDirty: true,
							shouldValidate: true
						})
					}
					options={{ properties: ['openDirectory', 'createDirectory'] }}
				/>
			</div>
			{formState.errors.clientDir && (
				<p className="text-secondary text-sm">
					{formState.errors.clientDir.message}
				</p>
			)}

			<TextButton
				type="submit"
				loading={formState.isSubmitting}
				className="self-end text-green"
			>
				Confirm
			</TextButton>
		</form>
	);
};

export default ClientDirDialog;
