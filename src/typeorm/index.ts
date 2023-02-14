import 'reflect-metadata';
import DataSource from './dataSource';
import Logger from '../utils/logger';

export default async () => {
	Logger.logInfo('Connecting to database...');
	await DataSource.initialize();
	Logger.logSuccess('Connected to database.');
};
