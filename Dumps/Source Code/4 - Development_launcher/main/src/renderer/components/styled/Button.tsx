import type { ButtonHTMLAttributes } from 'react';
import cls from 'classnames';
import { type LucideIcon } from 'lucide-react';

import IconSpinner from './IconSpinner';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
	primary?: boolean;
	loading?: boolean;
	disabled?: boolean;
	icon?: LucideIcon;
};

const Button = ({
	primary,
	loading,
	disabled,
	icon: Icon,
	children,
	className,
	...props
}: Props) => (
	<button
		{...props}
		onClick={props.onClick}
		tabIndex={!!loading || !!disabled ? -1 : props.tabIndex}
		className={cls('tw-button', className, {
			'pointer-events-none': !!disabled || !!loading,
			'grayscale': disabled,
			'tw-button-primary': primary
		})}
	>
		<span className={cls('select-none', { 'ml-[-12px]': !!loading || !!Icon })}>
			{loading ? (
				<IconSpinner size={23} strokeWidth={1.5} />
			) : Icon ? (
				<Icon size={23} strokeWidth={1.5} />
			) : null}
			{children}
		</span>
	</button>
);

export default Button;
