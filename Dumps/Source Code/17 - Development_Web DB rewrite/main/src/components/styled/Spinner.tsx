import { type HTMLAttributes } from 'react';
import cls from 'classnames';

type Props = HTMLAttributes<HTMLDivElement> & { size?: number };

const Spinner = ({ size = 50, className, ...props }: Props) => (
	<div
		style={{ width: size, borderWidth: Math.ceil(size * 0.1) }}
		className={cls(
			`inline-block aspect-square animate-spin rounded-full border border-blueGray border-t-[currentColor] opacity-75`,
			className
		)}
		{...props}
	/>
);

export default Spinner;
