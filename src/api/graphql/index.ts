/**
 * @file api/graphql/index.ts
 * @author dworac <mail@dworac.com>
 *
 * Index file for GraphQL. It uses Apollo Server to serve the GraphQL API and TypeGraphQL to define the schema.
 */
import { Application } from 'express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import cors from 'cors';
import { json } from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { buildSchema } from 'type-graphql';
import ip from 'ip';
import resolvers from './resolvers';
import config from '../../utils/config';
import { expressMiddlewareContext, GraphQLContext } from './GraphQLContext';
import Logger from '../../utils/logger';

export default async (app: Application) => {
	// TypeGraphQL schema
	const schema = await buildSchema({
		resolvers,
	});

	// Apollo Server
	const server = new ApolloServer<GraphQLContext>({
		schema,
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});
	await server.start();

	// Express middleware for Apollo Server
	const path = '/graphql';
	app.use(
		path,
		cors<cors.CorsRequest>(),
		json(),
		expressMiddleware(server, {
			context: expressMiddlewareContext,
		}),
	);
	Logger.logSuccess(
		`Graphql server listening on url http://${ip.address()}:${
			config.PORT
		}${path}`,
	);
};
