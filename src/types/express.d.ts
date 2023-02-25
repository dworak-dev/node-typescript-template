/**
 * @file types/express.d.ts
 * @author dworac <mail@dworac.com
 *
 * This file adds the user property to the Express Request interface.
 */
declare namespace Express {
	interface Request {
		user?: import('../api/auth/jwt').JwtPayload;

		cbURL?: string;
	}
}
