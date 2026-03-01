<script setup lang="ts">
import { defineAsyncComponent, shallowRef, watch } from "vue";

const props = defineProps<{
  src: string;
  componentName?: string; // ES模块导出的名称，为空则默认取 default
}>();

const emit = defineEmits(["load", "error"]);

const AsyncComponent = shallowRef();

watch(
  () => props.src,
  (newSrc) => {
    if (!newSrc) return;

    AsyncComponent.value = defineAsyncComponent(async () => {
      try {
        // 使用原生动态 import 加载远端 ES 模块，通过 @vite-ignore 绕过本地构建工具静态分析
        const module = await import(/* @vite-ignore */ newSrc);
        emit("load");
        // 根据传入的 componentName 获取对应导出，未传则默认处理为默认导出 (export default)
        return props.componentName ? module[props.componentName] : module.default || module;
      } catch (err) {
        emit("error", err);
        throw err;
      }
    });
  },
  { immediate: true },
);
</script>

<template>
  <Suspense>
    <template #default>
      <component :is="AsyncComponent" v-if="AsyncComponent" v-bind="$attrs" />
    </template>
    <template #fallback>
      <slot name="fallback">
        <div>Loading component...</div>
      </slot>
    </template>
  </Suspense>
</template>
