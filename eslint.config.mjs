import { dirname } from 'path';
import { fileURLToPath } from 'url';

import { FlatCompat } from '@eslint/eslintrc';
import pluginImport from 'eslint-plugin-import';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ['.next/**'],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: {
      import: pluginImport,
    },
    rules: {
      // 쓰이지 않는 변수 검사
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warning',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // import order 검사
      'import/order': [
        'error',
        {
          groups: [
            'builtin', // Node.js 내장 모듈
            'external', // 외부 라이브러리
            'internal', // 프로젝트 내부 alias
            ['parent', 'sibling', 'index'], // 상대 경로
            'object', // (거의 없음)
            'type', // 타입 임포트
          ],
          pathGroups: [
            {
              pattern: 'next/**',
              group: 'external',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
            },
            {
              pattern: '@src/**',
              group: 'internal',
            },
          ],
          pathGroupsExcludedImportTypes: ['type'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
    },
  },
];

export default eslintConfig;
