import cls from 'classnames';
import { type LucideIcon } from 'lucide-react';
import { type ReactNode } from 'react';

import IconSpinner from './IconSpinner';

type Props = {
	active?: boolean;
	loading?: boolean;
	disabled?: boolean;
	size?: number;
	className?: cls.Value;
	style?: React.CSSProperties;
} & (
	| { type: 'submit'; onClick?: never }
	| { type?: never; onClick: () => void }
) &
	(
		| { children: ReactNode; icon?: LucideIcon; title?: never }
		| { children?: never; icon: LucideIcon; title: string }
	);

const TextButton = ({
	title,
	type,
	active,
	loading,
	disabled,
	icon: Icon,
	size,
	onClick,
	className,
	children,
	...props
}: Props) => (
	<button
		title={title ?? (typeof children === 'string' ? children : undefined)}
		type={type ?? 'button'}
		onClick={onClick}
		tabIndex={!!loading || !!disabled ? -1 : undefined}
		className={cls(
			'flex cursor-pointer items-center gap-2 border-0 p-2',
			className,
			{
				'tw-color drop-shadow-[0px_0px_10px_white]':
					active && !loading && !disabled,
				'pointer-events-none text-gray': !!loading || !!disabled,
				'tw-hocus': !loading && !disabled
			}
		)}
		{...props}
	>
		{loading ? (
			<IconSpinner size={size ?? 24} strokeWidth={1.5} />
		) : (
			Icon && <Icon size={size} />
		)}
		{children && (
			<span className="cursor-pointer select-none tracking-wide text-inherit [font-size:_inherit]">
				{children}
			</span>
		)}
	</button>
);

export default TextButton;
