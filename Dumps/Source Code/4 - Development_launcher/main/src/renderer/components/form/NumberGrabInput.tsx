import cls from 'classnames';
import { type HTMLProps, forwardRef } from 'react';

type Props = Omit<
	HTMLProps<HTMLInputElement>,
	'value' | 'min' | 'max' | 'step'
> & {
	setValue: (v: number) => void;
	min?: number;
	max?: number;
	step?: number;
	sensitivity?: number;
};

const NumberGrabInput = forwardRef<HTMLInputElement, Props>(
	(
		{
			setValue,
			className,
			max = Infinity,
			min = -Infinity,
			step = 1,
			sensitivity = 0.1,
			...props
		},
		ref
	) => (
		<input
			ref={ref}
			{...props}
			onBlur={e => {
				props.onBlur?.(e);
				setValue(Math.max(Math.min(Number(e.currentTarget.value), max), min));
			}}
			onMouseDown={e => {
				const value = Number(e.currentTarget.value);
				const upListener = () => {
					window.removeEventListener('mouseup', upListener);
					window.removeEventListener('mousemove', moveListener);
				};
				const moveListener = (eM: MouseEvent) => {
					eM.preventDefault();
					const delta =
						Math.ceil((eM.clientX - e.clientX) * sensitivity) * step;
					setValue(Math.max(Math.min(value + delta, max), min));
				};
				window.addEventListener('mouseup', upListener);
				window.addEventListener('mousemove', moveListener);
			}}
			onMouseMove={e => e.preventDefault()}
			onWheel={e => !e.shiftKey && e.currentTarget.blur()}
			className={cls(
				className,
				'w-[70px] cursor-e-resize border-b border-blueGray bg-inherit p-1 text-center hocus:border-orange'
			)}
		/>
	)
);
export default NumberGrabInput;
