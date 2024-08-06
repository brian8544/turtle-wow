import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

import { api } from '~renderer/utils/api';
import { ConfigWtfSchema } from '~common/schemas';
import zodResolver from '~renderer/utils/zodResolver';
import useScrollHint from '~renderer/utils/useScrollHint';

import TextButton from '../styled/TextButton';
import CheckboxInput from '../form/CheckboxInput';

const ModsTab = () => {
	const { data: pref } = api.preferences.get.useQuery();
	const setPref = api.preferences.set.useMutation();

	const applyPatch = api.patcher.apply.useMutation();
	const verify = api.updater.verify.useMutation();

	const { handleSubmit, watch, setValue, reset } = useForm({
		defaultValues: pref?.config ?? {},
		resolver: zodResolver(ConfigWtfSchema)
	});

	// Form reset
	useEffect(() => {
		pref && reset(pref.config);
	}, [reset, pref]);

	const scrollRef = useScrollHint<HTMLDivElement>();

	return (
		<form
			onSubmit={handleSubmit(async config => {
				await setPref.mutateAsync({ config });
				await verify.mutateAsync();
				await applyPatch.mutateAsync();

				reset(config);
				// TODO: Success toast
			})}
			className="tw-surface flex min-h-0 flex-grow flex-col gap-3"
		>
			<div
				ref={scrollRef}
				className="relative -m-4 -mb-3 grid flex-grow grid-cols-[auto_auto_1fr] content-start items-center gap-x-3 gap-y-1 overflow-y-auto p-4 pb-3"
			>
				<p>Use VanillaFixes</p>
				<CheckboxInput
					value={!!watch('vanillaFixes')}
					setValue={v =>
						setValue('vanillaFixes', v, {
							shouldTouch: true,
							shouldDirty: true,
							shouldValidate: true
						})
					}
					className="justify-self-center"
				/>
				<p className="s1 text-blueGray">
					A client modification for World of Warcraft 1.12.1 to eliminate
					stutter and animation lag
				</p>
			</div>
			<hr />
			<div className="-mb-4 -mt-3 flex items-center gap-2 py-2">
				<p className="s1 col-span-3 flex-grow text-blueGray">
					Options marked by <span className="s1 text-warmGreen">color</span> are
					recommended and enabled by default
				</p>
				<TextButton
					onClick={async () => {
						const config = ConfigWtfSchema.parse({});
						await setPref.mutateAsync({ config });
						reset(config);
						// TODO: Success toast
					}}
				>
					Reset
				</TextButton>
				<TextButton type="submit" className="text-green">
					Apply
				</TextButton>
			</div>
		</form>
	);
};

export default ModsTab;
