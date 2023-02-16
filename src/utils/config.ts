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

	// Google
	GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID!,
	GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET!,
	GOOGLE_CALLBACK: process.env.GOOGLE_CALLBACK!,

	// JWT
	JWT_SECRET: process.env.JWT_SECRET!,
};
