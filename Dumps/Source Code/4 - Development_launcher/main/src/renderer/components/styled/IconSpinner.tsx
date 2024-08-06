import cls from 'classnames';
import { Loader2, type LucideProps } from 'lucide-react';

const IconSpinner = ({ className, ...props }: LucideProps) => (
	<Loader2 {...props} className={cls(className, 'animate-spin')} />
);

export default IconSpinner;
