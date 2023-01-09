import discord from './discord';
import typeorm from './typeorm';

/**
 * Main function.
 */
async function main() {
	// Typeorm
	await typeorm();

	// Discord bot
	await discord();
}

main().catch((e) => {
	// eslint-disable-next-line no-console
	console.error(e);
	process.exit(1);
});
