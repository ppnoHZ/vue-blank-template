<template>
  <div :class="prefix">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { provide } from "vue";

const props = defineProps<{
  prefix?: string;
}>();

const defaultPrefix = import.meta.env.VITE_STYLE_PREFIX || ".vwp";
const prefix = props.prefix || defaultPrefix.replace(/^\./, "");

provide("style-prefix", prefix);
</script>
