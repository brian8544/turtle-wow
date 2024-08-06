'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// TODO: import { SessionProvider } from 'next-auth/react';
import { type PropsWithChildren } from 'react';

const queryClient = new QueryClient();

const Providers = ({ children }: PropsWithChildren) => (
	<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default Providers;
