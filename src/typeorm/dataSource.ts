/**
 * @file typeorm/dataSource.ts
 * @author dworac <mail@dworac.com>
 *
 * This file exports the DataSource class used to connect to the database.
 */
import { DataSource } from 'typeorm';
import fs from 'fs';
import config from '../utils/config';
import entities from './entities';

import { update1677276770412 } from './migrations/1677276770412-update';

export default new DataSource({
	type: 'postgres',
	host: config.TYPEORM_HOST,
	port: config.TYPEORM_PORT,
	username: config.TYPEORM_USERNAME,
	password: config.TYPEORM_PASSWORD,
	database: config.TYPEORM_DATABASE,
	synchronize: false,
	logging: false,
	entities,
	migrations: [update1677276770412],
	subscribers: [],
	ssl: {
		rejectUnauthorized: config.PRODUCTION,
		ca: config.PRODUCTION
			? fs.readFileSync('./certs/ca.crt').toString()
			: undefined,
	},
});
