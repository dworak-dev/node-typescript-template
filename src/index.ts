import Logger from './utils/logger';

/**
 * Main function.
 */
async function main() {
	Logger.logInfo('Hello World!');
}

main().catch((e) => {
	// eslint-disable-next-line no-console
	console.error(e);
	process.exit(1);
});
