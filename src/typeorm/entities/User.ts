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
/**
 * @swagger
 *
 * components:
 *   schemas:
 *     User:
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         firstName:
 *           type: string
 *           example: John
 *           description: The user's first name.
 *         lastName:
 *           type: string
 *           example: Doe
 *           description: The user's last name.
 */
@ObjectType('User', { description: 'A user.' })
@Entity({ name: 'User' })
export default class User extends BaseEntity {
	/**
	 * Auto-generated id. Primary key.
	 */
	@PrimaryGeneratedColumn('uuid')
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
	 * The user's email address.
	 */
	@Column('text', { unique: true })
	@Field(() => String)
	googleEmail: string;

	/**
	 * Users google id. Should be unique.
	 */
	@Column('text', { unique: true })
	// @Field(() => String)
	googleId: string;

	/**
	 * Users google access token. Used to make requests to google and retrieve information later.
	 */
	@Column('text', { nullable: true })
	// @Field(() => String)
	googleAccessToken: string;
}
