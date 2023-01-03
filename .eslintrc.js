module.exports = {
	extends: [
		// Basic ESLint rules with typescript
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		// AirBnB style guide
		'airbnb-base',
		'airbnb-typescript/base',
		// Prettier
		'plugin:prettier/recommended',
		// JSDoc
		'plugin:jsdoc/recommended',
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'jsdoc'],
	root: true,
	parserOptions: {
		project: './tsconfig.json',
	},
	ignorePatterns: [
		'node_modules',
		'dist',
		'jest.config.ts',
		'coverage',
		'.idea',
	],
};
