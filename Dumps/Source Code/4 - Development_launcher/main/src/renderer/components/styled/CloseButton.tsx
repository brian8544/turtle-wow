import { X } from 'lucide-react';

import TextButton from './TextButton';

const CloseButton = ({ close }: { close: () => void }) => (
	<TextButton
		title="Close"
		icon={X}
		size={16}
		onClick={close}
		className="absolute right-1 top-1 text-blueGray hocus:text-red"
	/>
);
export default CloseButton;
