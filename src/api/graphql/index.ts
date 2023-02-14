// eslint-disable-next-line max-classes-per-file
import { Application } from 'express';
import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import cors from 'cors';
import { json } from 'body-parser';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';

import { ObjectType, Field, Resolver, Query, buildSchema } from 'type-graphql';

@ObjectType()
export class Product {
	@Field(() => String)
	id: string;

	@Field(() => String)
	title: string;

	@Field(() => String)
	price: number;
}

@Resolver(() => Product)
export class ProductResolver {
	// eslint-disable-next-line class-methods-use-this
	@Query(() => [Product])
	products() {
		return [];
	}
}
export default async (app: Application) => {
	const schema = await buildSchema({
		resolvers: [ProductResolver],
	});

	const server = new ApolloServer({
		schema,
		plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});
	await server.start();

	app.use(
		'/graphql',
		cors<cors.CorsRequest>(),
		json(),
		expressMiddleware(server),
	);
};
