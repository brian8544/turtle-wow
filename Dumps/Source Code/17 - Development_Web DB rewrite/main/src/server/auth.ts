// TODO: Not implemented
// import { DrizzleAdapter } from '@auth/drizzle-adapter';
// import {
// 	getServerSession,
// 	type DefaultSession,
// 	type NextAuthOptions
// } from 'next-auth';
// import { type Adapter } from 'next-auth/adapters';
// import { cache } from 'react';

// import { db } from '~/server/db';

// declare module 'next-auth' {
// 	// eslint-disable-next-line
//   interface Session extends DefaultSession {
// 		user: {
// 			id: string;
// 		} & DefaultSession['user'];
// 	}
// }

// export const authOptions: NextAuthOptions = {
// 	callbacks: {
// 		session: ({ session, user }) => ({
// 			...session,
// 			user: {
// 				...session.user,
// 				id: user.id
// 			}
// 		})
// 	},
// 	adapter: DrizzleAdapter(db) as Adapter,
// 	providers: []
// };

// export const getServerAuthSession = cache(() => getServerSession(authOptions));
