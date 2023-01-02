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
	],
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	root: true,
	parserOptions: {
		project: './tsconfig.json',
	},
};
