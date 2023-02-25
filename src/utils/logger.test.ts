/**
 * @file utils/logger.ts
 * @author dworac <mail@dworac.com>
 *
 * This file contains the unit testing for the logger class.
 */
import logger from './logger';

test('console.log', () => {
	logger.logInfo('Hello World!');
	logger.logSuccess('Hello World!');
	logger.logError('Hello World!');
});
