/**
 * @file api/graphql/resolvers/index.ts
 * @author dworac <mail@dworac.com>
 *
 * This file exports all resolvers.
 */
import { NonEmptyArray } from 'type-graphql';
import UserResolver from './UserResolver';

// eslint-disable-next-line @typescript-eslint/ban-types
const resolvers: NonEmptyArray<Function> = [UserResolver];

export default resolvers;
