/* eslint-disable @typescript-eslint/no-non-null-assertion */
import 'dotenv/config';

export default {
	// Discord
	DISCORD_BOT_TOKEN: process.env.DISCORD_BOT_TOKEN!,
	DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID!,

	// Database
	TYPEORM_HOST: process.env.TYPEORM_HOST!,
	TYPEORM_PORT: parseInt(process.env.TYPEORM_PORT!, 10),
	TYPEORM_USERNAME: process.env.TYPEORM_USERNAME!,
	TYPEORM_PASSWORD: process.env.TYPEORM_PASSWORD!,
	TYPEORM_DATABASE: process.env.TYPEORM_DATABASE!,

	// Express
	PORT: parseInt(process.env.PORT!, 10),
};
