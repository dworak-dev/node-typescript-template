/**
 * @file typeorm/index.ts
 * @author dworac <mail@dworac.com>
 *
 * This file is used to connect to the database using TypeORM.
 */
// Important to not delete this import, otherwise the entities won't be loaded.
import 'reflect-metadata';
import DataSource from './dataSource';
import Logger from '../utils/logger';

export default async () => {
	Logger.logInfo('Connecting to database...');
	await DataSource.initialize();
	Logger.logSuccess('Connected to database.');
};
