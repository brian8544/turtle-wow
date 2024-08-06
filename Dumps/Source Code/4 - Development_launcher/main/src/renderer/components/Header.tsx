import TurtleLogo from '~renderer/assets/logo.png';

import TextButton from './styled/TextButton';
import { TabNames, type TabType } from './TabsPanel';

type Props = {
	activeTab?: TabType;
	setActiveTab: (tab?: TabType) => void;
};

const Header = ({ activeTab, setActiveTab }: Props) => (
	<div className="-mb-3 flex select-none items-center gap-1">
		<button
			onClick={() => setActiveTab(undefined)}
			className="z-10 -my-3 mx-3 w-[180px] cursor-pointer"
		>
			<img src={TurtleLogo} alt="Turtle WoW" className="pointer-events-none" />
		</button>
		{TabNames.map(t => (
			<TextButton
				key={t}
				onClick={() => setActiveTab(t)}
				active={activeTab === t}
				className="uppercase"
			>
				{t}
			</TextButton>
		))}
	</div>
);

export default Header;
