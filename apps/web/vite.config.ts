import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import UnoCSS from "unocss/vite";
import { defineConfig } from "vite";
import { viteMockServe } from "vite-plugin-mock";
import vueDevTools from "vite-plugin-vue-devtools";
import importToCDN from "vite-plugin-cdn-import";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    UnoCSS(),
    vue(),
    vueDevTools({
      launchEditor: "code",
    }),
    importToCDN({
      enableInDevMode: true,
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: `https://cdn.jsdelivr.net/npm/vue@3.5.13/dist/vue.global.min.js?t=${Date.now()}`, // 添加时间戳
        },
      ],
    }),
    vueJsx(),
    viteMockServe({
      mockPath: "mock",
      enable: false,
    }),
  ],
});
