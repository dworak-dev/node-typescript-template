/**
 * @file typeorm/entities/User.ts
 * @author dworac <mail@dworac.com>
 *
 * This file contains the OAuthState entity.
 * This class represents the state variable for the OAuth process.
 * TypeORM is used to map the class to the database.
 * TypeGraphQL is used to map the class to the GraphQL schema.
 */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity({ name: 'OAuthState' })
export default class OAuthState extends BaseEntity {
	/**
	 * Auto-generated id. Primary key. Random UUID.
	 */
	@PrimaryGeneratedColumn('uuid')
	@Field(() => ID)
	id: string;

	/**
	 * Auth login optional callback URL.
	 */
	@Column('text', { nullable: true })
	@Field(() => String, { nullable: true })
	cbURL?: string;
}
