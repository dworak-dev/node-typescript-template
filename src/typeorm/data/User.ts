import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'User' })
class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column('text')
	firstName: string;

	@Column('text')
	lastName: string;

	@Column('int')
	age: number;
}

export default User;
