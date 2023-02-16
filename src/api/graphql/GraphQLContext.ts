import { JWTPayload } from '../auth/JWTPayload';

export interface GraphQLContext {
	user?: JWTPayload;
}
