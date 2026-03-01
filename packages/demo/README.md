# demo

## style 与主项目隔离

基础全局样式该如何处理？如果直接在 demo 项目中引入全局样式，可能会与主项目的样式发生冲突，导致样式混乱和不可预测的结果。为了避免这种情况，我们可以通过以下方式实现 style 与主项目的隔离：

1. CSS Modules 与主项目隔离

- 通过 vite.config.ts 中的 css.modules 配置，demo 项目的 css 样式会被编译成类似于 .low-code-app_xxx 的形式，从而实现与主项目样式的隔离。
- 在 App.vue 中，使用 .low-code-app 作为根元素的 class 名称，以确保 demo 项目的样式只作用于该元素及其子元素。
- 这种方式可以有效避免样式冲突，确保 demo 项目的样式不会影响到主项目的其他部分。

2. shadow DOM 与主项目隔离

- 通过使用 shadow DOM，可以将 demo 项目的组件封装在一个独立的 DOM 树中，从而实现与主项目的隔离。
- 在 App.vue 中，可以使用 <div class="low-code-app" v-shadow> 来创建一个 shadow DOM，并将 demo 项目的组件放置在该元素内。
- 这种方式可以确保 demo 项目的组件与主项目的组件完全隔离，避免了组件之间的样式和功能冲突问题。

## 组件库与主项目隔离

- 通过在 demo 项目中使用 ConfigProvider 组件，并设置 prefix 属性为 "vwp"，可以实现组件库与主项目的隔离。
- 这样，demo 项目中使用的组件将会以 "vwp" 作为前缀，而主项目中的组件则不会受到影响。
- 这种方式可以确保 demo 项目中的组件库与主项目的组件库相互独立，避免了组件命名冲突和样式冲突的问题。
