import { DataSource } from 'typeorm';
import fs from 'fs';
import config from '../utils/config';
import entities from './entities';

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
	migrations: ['./migrations/**/*{.ts,.js}'],
	subscribers: [],
	ssl: {
		ca: fs.readFileSync('ca-certificate.crt').toString(),
	},
});
