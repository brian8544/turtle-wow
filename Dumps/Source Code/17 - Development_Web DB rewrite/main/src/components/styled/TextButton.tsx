import cls from 'classnames';
import {
	type FunctionComponent,
	type MouseEventHandler,
	type ReactNode
} from 'react';
import Link from 'next/link';
import { type LucideIcon } from 'lucide-react';

import Spinner from './Spinner';

type IconType =
	| FunctionComponent<{ size?: number; className: string }>
	| LucideIcon;

type Props = {
	active?: boolean;
	loading?: boolean;
	disabled?: boolean;
	tabIndex?: number;
	iconSize?: number;
	className?: cls.Value;
} & (
	| { type: 'submit'; form?: string }
	| {
		type?: never;
		onClick: MouseEventHandler<HTMLButtonElement>;
		onDoubleClick?: MouseEventHandler<HTMLButtonElement>;
		onContextMenu?: MouseEventHandler<HTMLButtonElement>;
	}
	| {
			href: string;
			type: 'link';
			onClick?: MouseEventHandler<HTMLButtonElement>;
		}
) &
	(
		| { children: ReactNode; icon?: IconType; title?: never }
		| { children?: never; icon: IconType; title: string }
	);

// TODO: Make server compatible by changing how Icon is passed
const TextButton = ({
	title,
	active,
	loading,
	disabled,
	tabIndex,
	icon: Icon,
	iconSize,
	className,
	children,
	...props
}: Props) => {
	const Component = props.type === 'link' ? Link : 'button';
	return (
		<Component
			title={title ?? (typeof children === 'string' ? children : undefined)}
			tabIndex={!!loading || !!disabled ? -1 : tabIndex}
			className={cls(
				'flex cursor-pointer items-center gap-1 border-0 p-2',
				className,
				{
					'!text-pink/70': active && !loading && !disabled,
					'pointer-events-none text-gray': !!loading || !!disabled,
					'tw-hocus': !loading && !disabled
				}
			)}
			{...((props.type === 'link'
				? { href: props.href, onClick: props.onClick }
				: props.type === 'submit'
				? { form: props.form }
				: {
						type: 'button',
						onClick: props.onClick,
						onDoubleClick: props.onDoubleClick,
						onContextMenu: props.onContextMenu
						// eslint-disable-next-line @typescript-eslint/no-explicit-any
					}) as any)}
		>
			{loading ? (
				<Spinner size={iconSize ?? 24} />
			) : (
				Icon && <Icon size={iconSize} className="shrink-0" />
			)}
			{children && (
				<span className="cursor-pointer select-none text-inherit [font-size:inherit]">
					{children}
				</span>
			)}
		</Component>
	);
};

export default TextButton;
