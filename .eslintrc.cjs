module.exports = {
	extends: ['@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended'],
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.json'],
		extraFileExtensions: ['.vue'],
		warnOnUnsupportedTypeScriptVersion: false
	},
	plugins: ['@typescript-eslint', 'prettier'],
	root: true,
	rules: {
		'vue/multi-word-component-names': 'off',
		'@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
		'prettier/prettier': ['error', { printWidth: 120 }],
		'vue/no-v-html': 'off' // I hope you understand what you are doing
	}
}
