<script setup lang="ts">
import { Button as QButton, ConfigProvider } from "../component";
</script>

<template>
  <div class="low-code-app">
    <!-- vwp is the default prefix in vite.config.ts -->
    <ConfigProvider prefix="vwp">
      <h1>Vite Plugin Solution (Scheme B)</h1>
      <QButton
        msg="hello world"
        @change="
          (val) => {
            console.log(val);
          }
        "
      />
    </ConfigProvider>
  </div>
</template>

<style scoped></style>
