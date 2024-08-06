import { useState } from 'react';

import { api } from './utils/api';
import PageBackground from './assets/background.png';
import Header from './components/Header';
import LaunchPanel from './components/LaunchPanel';
import TabsPanel, { type TabType } from './components/TabsPanel';
import TopBar from './components/TopBar';
import IconSpinner from './components/styled/IconSpinner';
import usePreventDefaultEvents from './utils/usePreventDefaultEvents';

const App = () => {
	const { isLoading } = api.preferences.get.useQuery();

	const [activeTab, setActiveTab] = useState<TabType>();

	usePreventDefaultEvents();

	return (
		<div
			className="relative flex grow flex-col gap-3 overflow-hidden border border-blueGray/10 bg-cover bg-top bg-no-repeat p-[44px]"
			style={{ backgroundImage: `url(${PageBackground})` }}
		>
			<TopBar />
			<Header {...{ activeTab, setActiveTab }} />

			{isLoading ? (
				<div className="flex flex-grow items-center justify-center">
					<IconSpinner />
				</div>
			) : (
				<>
					<TabsPanel activeTab={activeTab} />
					<LaunchPanel />
				</>
			)}
		</div>
	);
};

export default App;
