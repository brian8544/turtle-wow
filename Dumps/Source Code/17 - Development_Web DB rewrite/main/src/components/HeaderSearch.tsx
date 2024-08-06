'use client';

import { Search } from 'lucide-react';
import { usePathname } from 'next/navigation';

import Input from './form/Input';

const HeaderSearch = () => {
	const pathname = usePathname();
	if (pathname === '/') return null;
	return <Input icon={Search} placeholder="Search" inputClassName="text-2xl" />;
};

export default HeaderSearch;
