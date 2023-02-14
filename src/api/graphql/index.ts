import { Application } from 'express';
import { ApolloServer } from '@apollo/server';
// import { ApolloServerPluginLandingPageGraphQLPlayground } from '@apollo/server-plugin-landing-page-graphql-playground';
import cors from 'cors';
import { json } from 'body-parser';
import { expressMiddleware } from '@apollo/server/express4';

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
  }
`;

const books = [
	{
		title: 'The Awakening',
		author: 'Kate Chopin',
	},
	{
		title: 'City of Glass',
		author: 'Paul Auster',
	},
];
const resolvers = {
	Query: {
		books: () => books,
	},
};
export default async (app: Application) => {
	// const schema = await buildSchema({
	// 	resolvers: [BookResolver],
	// });
	// console.log(schema);
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		// plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
	});
	await server.start();

	app.use(
		'/graphql',
		cors<cors.CorsRequest>(),
		json(),
		expressMiddleware(server),
	);
};
