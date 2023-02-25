/**
 * @file api/auth/jwt.ts
 * @author dworac <mail@dworac.com>
 *
 * This file contains the JWT authentication middleware.
 */
import passport from 'passport';
import passportJWT from 'passport-jwt';
import config from '../../utils/config';

const Jwt = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

export interface JwtPayload {
	id: string;
	email: string;
}

passport.use(
	new Jwt(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: config.JWT_SECRET,
		},
		(jwtPayload, cb) => {
			// find the user in db if needed. This functionality may be omitted if you store everything you'll need in JWT payload.
			// return UserModel.findOneById(jwtPayload.id)
			// 	.then((user) => {
			// 		return cb(null, user);
			// 	})
			// 	.catch((err) => {
			// 		return cb(err);
			// 	});
			return cb(null, jwtPayload);
		},
	),
);
