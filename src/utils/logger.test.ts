import logger from './logger';

test('console.log', () => {
	logger.logInfo('Hello World!');
	logger.logSuccess('Hello World!');
	logger.logError('Hello World!');
});
