import passport from 'passport';
import passportJWT from 'passport-jwt';
import config from '../../utils/config';

const Jwt = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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
