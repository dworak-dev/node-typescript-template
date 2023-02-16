import { Application } from 'express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import cors from 'cors';
import { json } from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import ip from 'ip';
import jwt from 'jsonwebtoken';
import passport from 'passport';
import resolvers from './resolvers';
import logger from '../../utils/logger';
import config from '../../utils/config';
import { GraphQLContext } from './GraphQLContext';

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
		passport.authenticate('jwt', { session: false }),
		expressMiddleware(server, {
			context: async ({ req }) => {
				const token = req.headers.authorization;

				if (!token) {
					return { user: null };
				}

				try {
					const verified = jwt.verify(token, 'secret');
					return { user: verified };
				} catch (error) {
					return { user: null };
				}
			},
		}),
	);
	logger.logSuccess(
		`Graphql server listening on url http://${ip.address()}:${
			config.PORT
		}${path}`,
	);
};
