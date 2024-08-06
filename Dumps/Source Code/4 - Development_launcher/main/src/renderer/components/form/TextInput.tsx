import cls from 'classnames';
import { forwardRef, type HTMLProps } from 'react';

const TextInput = forwardRef<HTMLInputElement, HTMLProps<HTMLInputElement>>(
	(props, ref) => (
		<input
			ref={ref}
			{...props}
			className={cls(
				'cursor-text border-b border-blueGray bg-inherit p-1 hocus:border-orange',
				props.className
			)}
		/>
	)
);

export default TextInput;
