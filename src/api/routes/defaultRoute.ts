/**
 * @file api/routes/defaultRoute.ts
 * @author dworac <mail@dworac.com>
 *
 *     This file serves as a template (example) for other routes. Make sure to add the route to src\api\routes\index.ts.
 */
import { Application } from 'express';
import passport from 'passport';

export default (app: Application) => {
	/**
	 * @swagger
	 * /users:
	 *   get:
	 *     summary: Retrieve a list of JSONPlaceholder users.
	 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
	 *     responses:
	 *       200:
	 *         description: A list of users.
	 *         content:
	 *           application/json:
	 *             schema:
	 *               $ref: '#/components/schemas/Pets'
	 */
	app.get('/', async (_req, res) => {
		res.json({ message: 'API working!!!' });
	});

	app.get(
		'/user',
		passport.authenticate('jwt', { session: false }),
		async (req, res) => {
			res.json(req.user);
		},
	);
};
