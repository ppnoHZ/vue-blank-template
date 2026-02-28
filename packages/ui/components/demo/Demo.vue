<template>
  <button :class="['ui-button', type, { disabled }]" :disabled="disabled" @click="handleClick">
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  type?: "default" | "primary" | "success" | string;
  disabled?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: "default",
  disabled: false,
});

const emit = defineEmits<{
  (e: "click", event: MouseEvent): void;
}>();

function handleClick(event: MouseEvent) {
  if (!props.disabled) {
    emit("click", event);
  }
}
</script>

<style scoped>
.ui-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background: #f5f5f5;
  color: #333;
  cursor: pointer;
  transition: background 0.2s;
  font-size: 14px;
}
.ui-button.primary {
  background: #409eff;
  color: #fff;
}
.ui-button.success {
  background: #67c23a;
  color: #fff;
}
.ui-button.disabled,
.ui-button:disabled {
  background: #e4e7ed;
  color: #c0c4cc;
  cursor: not-allowed;
}
</style>
