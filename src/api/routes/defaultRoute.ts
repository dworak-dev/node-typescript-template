import { Application } from 'express';
import passport from 'passport';

export default (app: Application) => {
	app.get(
		'/',
		passport.authenticate('jwt', { session: false }),
		async (_req, res) => {
			res.json({ message: 'API working!!' });
		},
	);
};
