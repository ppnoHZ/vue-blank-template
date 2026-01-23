# `Vue3` Template

## Quick Start

### dev

```sh
pnpm dev
```

## 提交信息规范 (Conventional Commits)

本项目通过 `simple-git-hooks + commitlint` 校验提交信息格式。

安装依赖后会自动执行：

```sh
pnpm prepare
```

生成/刷新 `.git/hooks/commit-msg`，在提交时执行：

```
npx --no -- commitlint --edit $1
```

### 格式

```
<type>(<scope>): <subject>

<body>

<footer>
```

`scope` 可选；英文冒号+空格；`subject` 简洁小写动词开头。

### 常用 type

feat | fix | docs | style | refactor | perf | test | build | ci | chore | revert

### 规则摘录

- 行宽：正文、Footer 不超过 120 字符
- 如需关闭 issue：`Closes #123`

### 示例

```
feat(editor): 支持多标签页面切换

新增 TabBar 组件，实现 keep-alive 策略；抽取路由守卫逻辑。

Closes #45
```

### 手动校验最近一次提交

```sh
pnpm commitlint --from=HEAD~1 --to=HEAD
```

### 常见问题

| 问题         | 说明                                                  |
| ------------ | ----------------------------------------------------- |
| 提交被拒绝   | 按错误提示修正提交信息格式即可                        |
| hooks 没执行 | 运行 `pnpm prepare` 重新生成 hooks                    |
| 想跳过校验   | 临时: `git commit -m 'msg' --no-verify`（不建议常用） |

## Pre-commit 钩子 (lint-staged)

已配置 `pre-commit` 钩子执行 `pnpm lint-staged`：

lint-staged 规则（`package.json` 中）：

```json
"lint-staged": {
	"*.{js,jsx,ts,tsx,vue}": ["eslint --fix"],
	"*.{ts,tsx,js,jsx,vue,md,json,css,scss,less}": ["prettier --write"],
	"*.{css,scss,less}": ["stylelint --fix"]
}
```

### 行为说明

1. 仅对暂存区(staged)文件运行修复
2. 修复后会自动 `git add`（lint-staged 默认行为）
3. 任一命令失败则阻止提交

### 手动触发 lint-staged（调试）

```sh
pnpm lint-staged
```

### 跳过 pre-commit（不推荐）

```sh
git commit -m "feat: xxx" --no-verify
```

### 常见排错

| 症状                 | 解决                                                                |
| -------------------- | ------------------------------------------------------------------- |
| 提交时无限循环/极慢  | 规避巨型文件进暂存区，或排除大文件（可在 lint-staged 配置中加忽略） |
| ESLint 未运行        | 确认文件是否已 `git add`                                            |
| stylelint 报未知语法 | 确认文件类型是否匹配、或排除不需要的后缀                            |
