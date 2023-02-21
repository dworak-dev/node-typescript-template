/* eslint-disable @typescript-eslint/no-non-null-assertion */
/**
 * @file utils/config.ts
 * @author dworac <maijl@dworac.com>
 *
 * This file exports the config object used to store all environment variables.
 */
import 'dotenv/config';

const missingEnvVar = (name: string) => {
	throw new Error(`Missing environment variable: ${name}`);
};

const importEnvVarString = (name: string, def?: string): string => {
	const value = process.env[name];
	if (!value) {
		if (def) return def;
		return missingEnvVar(name);
	}
	return value;
};

const importEnvVarNumber = (name: string, def?: number): number => {
	const value = process.env[name];
	if (!value) {
		if (def) return def;
		return missingEnvVar(name);
	}
	return Number(value);
};

export default {
	// Environment
	PRODUCTION: process.env.NODE_ENV === 'production',

	// Discord
	DISCORD_BOT_TOKEN: importEnvVarString('DISCORD_BOT_TOKEN'),
	DISCORD_CLIENT_ID: importEnvVarString('DISCORD_CLIENT_ID'),

	// Database
	TYPEORM_HOST: importEnvVarString('TYPEORM_HOST'),
	TYPEORM_PORT: importEnvVarNumber('TYPEORM_PORT'),
	TYPEORM_USERNAME: importEnvVarString('TYPEORM_USERNAME'),
	TYPEORM_PASSWORD: importEnvVarString('TYPEORM_PASSWORD'),
	TYPEORM_DATABASE: importEnvVarString('TYPEORM_DATABASE'),

	// Express
	PORT: importEnvVarNumber('PORT', 3333),

	// Google
	GOOGLE_CLIENT_ID: importEnvVarString('GOOGLE_CLIENT_ID'),
	GOOGLE_CLIENT_SECRET: importEnvVarString('GOOGLE_CLIENT_SECRET'),
	GOOGLE_CALLBACK: importEnvVarString('GOOGLE_CALLBACK'),

	// JWT
	JWT_SECRET: importEnvVarString('JWT_SECRET'),
	JWT_EXPIRES_IN: importEnvVarString('JWT_EXPIRES_IN', '1d'),
};
