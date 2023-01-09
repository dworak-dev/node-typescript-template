import 'reflect-metadata';
import DataSource from './data-source';
import Logger from '../utils/logger';

export default async () => {
	Logger.logInfo('Connecting to database...');
	await DataSource.initialize();
	Logger.logInfo('Connected to database.');
};
