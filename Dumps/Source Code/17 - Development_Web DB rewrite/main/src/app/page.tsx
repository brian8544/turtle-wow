import { Search } from 'lucide-react';

import Input from '~/components/form/Input';

const Home = async () => (
	<div className="flex grow items-center justify-center">
		<Input icon={Search} placeholder="Search" inputClassName="text-4xl" />
	</div>
);

export default Home;
