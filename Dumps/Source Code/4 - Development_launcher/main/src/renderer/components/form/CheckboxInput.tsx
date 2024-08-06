import cls from 'classnames';
import { type ReactNode } from 'react';

import TextButton from '../styled/TextButton';

const Checkbox = () => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 12 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<rect x="1" y="1" width="10" height="10" rx="1" stroke="currentColor" />
		<rect x="3.5" y="3.5" width="5" height="5" fill="white" />
	</svg>
);

type Props = {
	label?: ReactNode;
	value: boolean;
	setValue: (v: boolean) => void;
	className?: cls.Value;
};

const CheckboxInput = ({ label, value, setValue, className }: Props) => (
	<TextButton
		onClick={() => setValue(!value)}
		icon={Checkbox}
		className={cls('text-blueGray', { '[&_*]:fill-none': !value }, className)}
	>
		{label}
	</TextButton>
);

export default CheckboxInput;
