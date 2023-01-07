import discord from './discord';
import Logger from './utils/logger';

/**
 * Main function.
 */
async function main() {
	Logger.logInfo('Starting Discord bot');
	// Discord bot
	await discord();
}

main().catch((e) => {
	// eslint-disable-next-line no-console
	console.error(e);
	process.exit(1);
});
