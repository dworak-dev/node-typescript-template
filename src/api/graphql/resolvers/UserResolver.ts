/* eslint-disable class-methods-use-this */
/**
 * @file api/graphql/resolvers/UserResolver.ts
 * @author dworac <mail@dworac.com>
 *
 * This file serves as a template (example) for other resolvers. Make sure to add the resolver to src\api\graphql\resolvers\index.ts.
 */
import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import { GraphQLError } from 'graphql';
import User from '../../../typeorm/entities/User';
import authMiddleware from './middlewares/auth';

@Resolver(() => User)
export default class UserResolver {
	@Query(() => [User], { description: 'Get all users.' })
	@UseMiddleware(authMiddleware)
	users() {
		return User.find();
	}

	@Query(() => User, { description: 'Get user by id.' })
	@UseMiddleware(authMiddleware)
	async user(@Arg('id', () => Number) id: number) {
		const user = await User.findOne({
			where: { id },
		});

		if (!user) {
			throw new GraphQLError('User not found', {
				extensions: {
					code: 'NOT_FOUND',
					http: { status: 404 },
				},
			});
		}
		return user;
	}
}
