import { Application } from 'express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import cors from 'cors';
import { json } from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import ip from 'ip';
import passport from 'passport';
import resolvers from './resolvers';
import config from '../../utils/config';
import { GraphQLContext } from './GraphQLContext';
import User from '../../typeorm/entities/User';
import Logger from '../../utils/logger';

export default async (app: Application) => {
	const schema = await buildSchema({
		resolvers,
	});

	const server = new ApolloServer<GraphQLContext>({
		schema,
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});

	await server.start();

	const path = '/graphql';
	app.use(
		path,
		cors<cors.CorsRequest>(),
		json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
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
			},
		}),
	);
	Logger.logSuccess(
		`Graphql server listening on url http://${ip.address()}:${
			config.PORT
		}${path}`,
	);
};
