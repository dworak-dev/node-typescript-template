/* eslint-disable class-methods-use-this */
import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import { GraphQLError } from 'graphql';
import User from '../../../typeorm/models/User';
import authMiddleware from '../middlewares/auth';

@Resolver(() => User)
export default class UserResolver {
	@UseMiddleware(authMiddleware)
	@Query(() => [User])
	users() {
		return User.find();
	}

	@Query(() => User)
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
