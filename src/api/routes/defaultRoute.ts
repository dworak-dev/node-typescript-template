import { Application } from 'express';

export default (app: Application) => {
	app.get('/', async (_req, res) => {
		res.json({ message: 'API working!!' });
	});
};
