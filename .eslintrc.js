/**
 * @file .eslintrc.js
 * @author dworac <mail@dworac.com>
 *
 * This eslint config is based on the Airbnb style guide. It includes support for typescript, prettier, jest and jsdoc.
 */
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
	rules: {
		'prettier/prettier': ['error', { endOfLine: 'auto' }],
		'jsdoc/require-file-overview': 1,
	},
	settings: {
		jsdoc: {
			structuredTags: {
				swagger: {
					name: 'swagger',
				},
				openapi: {
					name: 'swagger',
				},
			},
		},
	},
};
