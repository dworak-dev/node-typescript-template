import User from '../../typeorm/entities/User';

export interface GraphQLContext {
	user?: User;
}
