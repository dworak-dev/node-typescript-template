import { Application } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { classToPlain } from 'class-transformer';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import config from '../../utils/config';
import User from '../../typeorm/entities/User';

passport.use(
	new GoogleStrategy(
		{
			clientID: config.GOOGLE_CLIENT_ID,
			clientSecret: config.GOOGLE_CLIENT_SECRET,
			callbackURL: config.GOOGLE_CALLBACK,
		},
		async (accessToken, refreshToken, profile, done) => {
			try {
				// let user = await UserModel.findOne({ googleId: profile.id });
				let user = await User.findOne({
					where: { googleId: profile.id },
				});
				if (user) {
					user.googleAccessToken = accessToken;
					user.googleRefreshToken = refreshToken;
					await user.save();
				} else {
					user = new User();
					user.googleId = profile.id;
					user.firstName = profile.displayName;
					user.lastName = profile.displayName;
					user.googleAccessToken = accessToken;
					user.googleRefreshToken = refreshToken;
					await user.save();
				}
				done(null, user);
			} catch (err) {
				if (err instanceof Error) {
					done(err, undefined);
				}
			}
		},
	),
);
export default (app: Application) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', {
			scope: ['profile'],
			session: false,
			prompt: 'select_account',
		}),
	);

	app.get(
		'/auth/google/callback',
		passport.authenticate('google', {
			failureRedirect: '/login',
			session: false,
		}),
		(req, res) => {
			if (req.user) {
				const plain = classToPlain(req.user);

				const token = jwt.sign(plain, config.JWT_SECRET, {
					expiresIn: 60 * 60 * 24,
				});
				res.cookie('token', token);
			}
			res.redirect('/');
		},
	);
};
