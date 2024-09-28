import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';

export default [
  { files: ['**/*.{js,mjs,cjs,ts,vue}'] },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...pluginVue.configs['flat/essential'],
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: tseslint.parser } },
  },
  {
    files: ['**/*.vue'],
    rules: {
      // 禁用多词组件名称的检查
      'vue/multi-word-component-names': 'off',
      // 禁用关于 transition 的检查
      'vue/require-toggle-inside-transition': 'off',
    },
  },
  // 添加 ignores 属性以忽略 dist 文件夹
  { ignores: ['dist/'] },
];
