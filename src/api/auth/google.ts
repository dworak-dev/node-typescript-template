/**
 * @file api/auth/google.ts
 * @author dworac <mail@dworac.com>
 *
 * This file handles the Google OAuth2 authentication flow via passport.
 */
import { Application, Request } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { classToPlain } from 'class-transformer';
import {
	GoogleCallbackParameters,
	Strategy as GoogleStrategy,
	Profile,
	VerifyCallback,
} from 'passport-google-oauth20';
import validator from 'validator';
import config from '../../utils/config';
import User from '../../typeorm/entities/User';
import OAuthState from '../../typeorm/entities/OAuthState';
import isURL = validator.isURL;

passport.use(
	new GoogleStrategy(
		{
			clientID: config.GOOGLE_CLIENT_ID,
			clientSecret: config.GOOGLE_CLIENT_SECRET,
			callbackURL: config.GOOGLE_CALLBACK,
			passReqToCallback: true,
		},
		async (
			req: Request,
			accessToken: string,
			refreshToken: string,
			params: GoogleCallbackParameters,
			profile: Profile,
			done: VerifyCallback,
		) => {
			const { state } = req.query;

			if (!state || typeof state !== 'string') {
				return done(new Error('No state provided'));
			}

			const oAuthState = await OAuthState.findOne({
				where: { id: state },
			});

			if (!oAuthState) {
				return done(new Error('Invalid state'));
			}
			req.cbURL = oAuthState.cbURL;

			try {
				let user = await User.findOne({
					where: { googleId: profile.id },
				});
				if (user) {
					user.googleAccessToken = accessToken;
					user.firstName = profile.name?.givenName || '';
					user.lastName = profile.name?.familyName || '';
					await user.save();
				} else {
					user = new User();
					user.googleId = profile.id;
					user.firstName = profile.name?.givenName || '';
					user.lastName = profile.name?.familyName || '';
					user.googleEmail = profile.emails?.[0].value || '';
					user.googleAccessToken = accessToken;
					await user.save();
				}
				return done(null, user);
			} catch (err) {
				if (err instanceof Error) {
					return done(err, undefined);
				}
			}
			return done(new Error('Unknown error'), undefined);
		},
	),
);
export default (app: Application) => {
	app.get('/auth/google', async (req, res) => {
		let cbURL: string | undefined;

		if (req.query.cbURL && typeof req.query.cbURL === 'string') {
			if (isURL(req.query.cbURL, { require_tld: false })) {
				cbURL = req.query.cbURL;
			}
		}
		const oAuthState = new OAuthState();
		oAuthState.cbURL = cbURL;
		await oAuthState.save();

		passport.authenticate('google', {
			scope: ['profile', 'email'],
			session: false,
			prompt: 'select_account',
			state: oAuthState.id,
		})(req, res);
	});

	app.get(
		'/auth/google/callback',
		passport.authenticate('google', {
			session: false,
			failureRedirect: '/login',
		}),
		(req, res) => {
			if (req.user) {
				const plain = classToPlain(req.user);

				const token = jwt.sign(plain, config.JWT_SECRET, {
					expiresIn: config.JWT_EXPIRES_IN,
				});

				if (req.cbURL) {
					res.redirect(`${req.cbURL}?token=${token}`);
				} else {
					res.redirect(`/?token=${token}`);
				}
			} else {
				res.redirect('/');
			}
		},
	);
};
