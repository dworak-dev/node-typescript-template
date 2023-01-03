import sum from './sum';
import logger from './utils/logger';

test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3);
});

test('console.log', () => {
	logger.logInfo('Hello World!');
	logger.logSuccess('Hello World!');
});
