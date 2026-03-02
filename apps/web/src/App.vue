<script setup lang="ts">
import RemoteScript from "./components/RemoteScript.vue";

const handleScriptLoad = () => {
  console.log("Remote script loaded successfully");
};
</script>

<template>
  <div class="low-code-app">
    <!-- 传入组件地址以及它在 ES 模块中的导出名 componentName -->
    <!-- 原本写在 Button 上的参数和自定义事件可以直接绑定在这里，它们会被透传 -->
    <RemoteScript
      src="http://localhost:5173/0.0.1/button.es.js"
      componentName="Component"
      msg="hello world"
      @load="handleScriptLoad"
      @change="
        (val: any) => {
          console.log(val);
        }
      "
    >
      <template #fallback>
        <div>Loading remote component...</div>
      </template>
    </RemoteScript>
  </div>
</template>

<style scoped></style>
