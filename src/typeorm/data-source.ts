import { DataSource } from 'typeorm';
import User from './data/User';
import config from '../utils/config';

const AppDataSource = new DataSource({
	type: 'postgres',
	host: config.TYPEORM_HOST,
	port: config.TYPEORM_PORT,
	username: config.TYPEORM_USERNAME,
	password: config.TYPEORM_PASSWORD,
	database: config.TYPEORM_DATABASE,
	synchronize: false,
	logging: false,
	entities: [User],
	migrations: ['./migrations/**/*{.ts,.js}'],
	subscribers: [],
	ssl: {
		rejectUnauthorized: false,
	},
});

export default AppDataSource;
