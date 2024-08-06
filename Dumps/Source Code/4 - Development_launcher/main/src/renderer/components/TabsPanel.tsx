import AddonsTab from './tabs/AddonsTab';
import ComingSoonTab from './tabs/ComingSoonTab';
import ModsTab from './tabs/ModsTab';
import NewsTab from './tabs/NewsTab';
import TweaksTab from './tabs/TweaksTab';

const Tabs = {
	'game settings': <TweaksTab />,
	'addons': <AddonsTab />,
	'mods': <ModsTab />,
	'profiles': <ComingSoonTab />
} as const;

export const TabNames = Object.keys(Tabs) as TabType[];

export type TabType = keyof typeof Tabs;

type Props = { activeTab?: TabType };

const TabsPanel = ({ activeTab }: Props) =>
	activeTab ? Tabs[activeTab] : <NewsTab />;

export default TabsPanel;
