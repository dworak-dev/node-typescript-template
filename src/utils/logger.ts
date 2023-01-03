/**
 * @file logger.ts
 *
 * This file contains the Logger class.
 * @author dworac <mail@dworac.com>
 */
import chalk from 'chalk';

/**
 * Logger class.
 *
 * @class Logger
 * @example
 * import logger from './utils/logger';
 *
 * logger.logInfo('Hello World!');
 * logger.logSuccess('Hello World!');
 * logger.logError('Hello World!');
 */
class Logger {
	/**
	 * Logs an info message.
	 *
	 * @param {string} message - Message to be printed with blue highlight.
	 */
	static logInfo(message: string) {
		// eslint-disable-next-line no-console
		console.log(chalk.blue('[INFO] ') + chalk.white(message));
	}

	/**
	 * Logs a success message.
	 *
	 * @param {string} message - Message to be printed with green highlight.
	 */
	static logSuccess(message: string) {
		// eslint-disable-next-line no-console
		console.log(chalk.green('[SUCCESS] ') + chalk.green(message));
	}

	/**
	 * Logs an error message.
	 *
	 * @param {string} message - Message to be printed with a red highlight.
	 */
	static logError(message: string | Error) {
		if (typeof message === 'string') {
			// eslint-disable-next-line no-console
			console.log(chalk.red('[ERROR] ') + chalk.red(message));
		} else {
			// eslint-disable-next-line no-console
			console.log(chalk.red('[ERROR] ') + chalk.red(message.message));
		}

		// eslint-disable-next-line no-console
	}
}

export default Logger;
