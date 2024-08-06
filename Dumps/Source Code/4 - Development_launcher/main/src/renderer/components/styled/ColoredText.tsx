export const ColoredText = ({
	children,
	className,
	style
}: {
	children: string;
	className?: string;
	style?: React.CSSProperties;
}) => {
	const split = children.split('|cff');
	return (
		<p className={className} style={style}>
			{split.map((s, i) =>
				i === 0 ? (
					s
				) : (
					<span
						key={i}
						className="text-size-inherit text-inherit"
						style={{ color: `#${s.slice(0, 6)}` }}
					>
						{s.endsWith('|r') ? s.slice(6, -2) : s.slice(6)}
					</span>
				)
			)}
		</p>
	);
};
