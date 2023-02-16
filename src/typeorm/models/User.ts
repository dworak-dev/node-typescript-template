import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity({ name: 'User' })
export default class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	@Field(() => ID)
	id: number;

	@Column('text')
	@Field(() => String)
	firstName: string;

	@Column('text')
	@Field(() => String)
	lastName: string;

	@Column('text')
	@Field(() => String)
	googleId: string;

	@Column('text', { nullable: true })
	@Field(() => String)
	googleAccessToken: string;

	@Column('text', { nullable: true })
	@Field(() => String)
	googleRefreshToken: string;
}
