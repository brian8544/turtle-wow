import cls from 'classnames';

import TextButton from '../styled/TextButton';

const Radio = () => (
	<svg
		width={16}
		height={16}
		viewBox="0 0 12 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<circle cx="6" cy="6" r="5.5" stroke="currentColor" />
		<path
			d="M8 6C8 7.10429 7.10429 8 6 8C4.89571 8 4 7.10429 4 6C4 4.8957 4.89571 4 6 4C7.10429 4 8 4.8957 8 6Z"
			fill="white"
		/>
	</svg>
);

type Props<T> = {
	value: T;
	setValue: (val: T) => void;
	options: { label: string; value: T }[];
};

const RadioInput = <const T,>({ value, setValue, options }: Props<T>) => (
	<div className="flex justify-start">
		{options.map(o => (
			<TextButton
				key={`${o.value}`}
				onClick={() => setValue(o.value)}
				icon={Radio}
				className={cls('text-blueGray', {
					'[&_*]:fill-none': value !== o.value
				})}
			>
				{o.label}
			</TextButton>
		))}
	</div>
);

export default RadioInput;
