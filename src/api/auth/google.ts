import { Application } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import { classToPlain } from 'class-transformer';

export default (app: Application) => {
	app.get(
		'/auth/google',
		passport.authenticate('google', { scope: ['profile'], session: false }),
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

				const token = jwt.sign(plain, 'secret', {
					expiresIn: 60 * 60 * 24,
				});
				res.cookie('token', token);
			}
			// Successful authentication, redirect home.
			res.redirect('/');
		},
	);
};
