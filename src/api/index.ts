import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import config from '../utils/config';
import setupRoutes from './routes';
import logger from '../utils/logger';
import errorHandling from './errorHandling';

export default () => {
	const app = express();

	// Parse body and urlencoded parameters.
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));

	// Allow requests from all origins.
	app.use(
		cors({
			credentials: true,
		}),
	);

	// Setup routes
	setupRoutes(app);

	// Setup error handling
	errorHandling(app);

	// Start Express API
	app.listen(config.PORT, () => {
		logger.logSuccess(`Express server listening on port ${config.PORT}`);
	});
};
