/**
 * @file api/graphql/GraphQLContext.ts
 * @author dworac <mail@dworac.com>
 *
 * This file defines the GraphQL context. The context is passed to every resolver and contains all the data that is needed to resolve a query.
 */
import passport from 'passport';
import { ContextFunction } from '@apollo/server';
import { ExpressContextFunctionArgument } from '@apollo/server/express4';
import User from '../../typeorm/entities/User';
import Logger from '../../utils/logger';

export interface GraphQLContext {
	/**
	 * The user that is currently logged in. If no user is logged in, this is undefined.
	 */
	user?: User;
}

export const expressMiddlewareContext: ContextFunction<
	[ExpressContextFunctionArgument],
	GraphQLContext
> = async ({ req }) => {
	const user = await new Promise<User | undefined>((resolve) => {
		passport.authenticate(
			'jwt',
			{ session: false },
			(err: Error, _user: User) => {
				if (err) {
					Logger.logError(err);
				}
				if (_user) {
					resolve(_user);
				} else {
					resolve(undefined);
				}
			},
		)(req);
	});

	return { user };
};
