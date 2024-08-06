import { Bug } from 'lucide-react';

import TextButton from '~/components/styled/TextButton';

// TODO: Implement a proper footer
const Footer = () => (
	<footer className="flex max-w-screen-xl items-center justify-center gap-3 p-2 md:px-6 md:py-2 xl:mx-auto xl:w-full">
		<p className="text-sm text-blueGray">Created by Haaxor1689</p>
		<TextButton
			type="link"
			href="https://github.com/Haaxor1689/talent-builder/issues"
			icon={Bug}
			iconSize={18}
			className="shrink-0 text-sm text-blueGray"
		>
			Report a bug
		</TextButton>
	</footer>
);

export default Footer;
