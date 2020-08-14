module.exports = {
	"env": {
		"browser": true,
		"commonjs": true,
		"es2020": true
	},
	"plugins": ["node"],
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 11
	},
	"rules": {
		"semi": "error",
		"no-extra-semi": "error",
		"quotes": ["error", "single"],
		"space-before-blocks": ["warn", { "functions": "always","keywords": "always","classes": "always"}],
		"no-undef": "error",
	}
};
