/**
 * @file api/graphql/resolvers/middlewares/auth.ts
 * @author dworac <mail@dworac.com>
 *
 * This middleware checks if the user is authenticated.
 */
import { MiddlewareFn } from 'type-graphql';
import { GraphQLError } from 'graphql/index';
import { GraphQLContext } from '../../GraphQLContext';

const authMiddleware: MiddlewareFn<GraphQLContext> = ({ context }, next) => {
	if (context.user) {
		return next();
	}
	throw new GraphQLError('User is not authenticated', {
		extensions: {
			code: 'UNAUTHENTICATED',
			http: { status: 401 },
		},
	});
};

export default authMiddleware;
