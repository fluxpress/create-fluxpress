import globals from 'globals'
import js from '@eslint/js'
import tsEslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

export default [
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  js.configs.recommended,
  ...tsEslint.configs.recommended,
  eslintConfigPrettier,
  eslintPluginPrettierRecommended,
]
