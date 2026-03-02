<template>
  <button class="q-button" :style="dynamicStyle" @click="onclick">Click me ({{ count }})</button>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";

const props = defineProps<{
  msg: string;
}>();

const emit = defineEmits<{
  change: [value: string];
}>();

const count = ref(0);

const dynamicStyle = computed(() => {
  let color = "#42b983";
  if (count.value >= 10) {
    // Logic: 10 times reset, but requirement says "10 times reset", usually means at 11 or after 10.
    // "10次之后重新计算" -> after 10 times, recalculate.
  }

  if (count.value >= 5) {
    color = "red";
  } else if (count.value >= 3) {
    color = "#f39c12";
  }
  return { "--btn-bg": color };
});

const onclick = () => {
  count.value++;
  if (count.value > 10) {
    count.value = 1;
  }
  console.log("Button clicked, count:", count.value);
  emit("change", props.msg);
};
</script>
<style lang="less">
// 全局样式需要引入到组件中，否则无法隔离
button {
  margin: 0 8px;
}
</style>
<style scoped lang="less">
.q-button {
  padding: 8px 16px;
  background-color: var(--btn-bg, #42b983);
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}
</style>
