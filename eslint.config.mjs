// @ts-check

import { defineConfig } from '@qes/eslint-config'

export default defineConfig([
  {
    // 覆盖规则
    rules: {
      // Vue 组件 prop 未提供默认值仅提示警告
      'vue/require-default-prop': 'warn',
      // 控制台输出仅警告（仍允许 warn / error）
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'error'
    }
  },
  // 忽略文件
  {
    ignores: ['**/public']
  }
])
