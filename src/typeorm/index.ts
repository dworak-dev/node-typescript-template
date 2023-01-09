import 'reflect-metadata';
import User from './data/User';
import DataSource from './data-source';
import Logger from '../utils/logger';

export default async () => {
	try {
		await DataSource.initialize();
	} catch (error) {
		if (error instanceof Error) {
			Logger.logError(error);
		}
	}
	Logger.logInfo('Inserting a new user into the database...');
	const user = new User();
	user.firstName = 'Timber';
	user.lastName = 'Saw';
	user.age = 25;
	await DataSource.manager.save(user);
	Logger.logInfo(`Saved a new user with id: ${user.id}`);

	Logger.logInfo('Loading users from the database...');
	const users = await DataSource.manager.find(User);
	Logger.logInfo(`Loaded users: ${JSON.stringify(users)}`);

	Logger.logInfo(
		'Here you can setup and run express / fastify / any other framework.',
	);
};
