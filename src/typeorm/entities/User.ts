/**
 * @file typeorm/entities/User.ts
 * @author dworac <mail@dworac.com>
 *
 * This file contains the User entity.
 * This class represents a user.
 * TypeORM is used to map the class to the database.
 * TypeGraphQL is used to map the class to the GraphQL schema.
 */
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity({ name: 'User' })
export default class User extends BaseEntity {
	/**
	 * Auto-generated id. Primary key.
	 */
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id: number;

	/**
	 * The user's first name.
	 */
	@Column('text')
	@Field(() => String)
	firstName: string;

	/**
	 * The user's last name.
	 */
	@Column('text')
	@Field(() => String)
	lastName: string;

	/**
	 * Users google id. Should be unique.
	 */
	@Column('text', { unique: true })
	@Field(() => String)
	googleId: string;

	/**
	 * Users google access token. Used to make requests to google and retrieve information later.
	 */
	@Column('text', { nullable: true })
	@Field(() => String)
	googleAccessToken: string;
}
