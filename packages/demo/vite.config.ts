import { fileURLToPath, URL } from "node:url";
import { readdirSync, statSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import vueDevTools from 'vite-plugin-vue-devtools'
import importToCDN from "vite-plugin-cdn-import";
// @ts-expect-error: no types for postcss-prefix-selector
import prefixer from "postcss-prefix-selector";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const stylePrefix = env.VITE_STYLE_PREFIX || ".vwp";

  // 读取版本号
  const pkg = JSON.parse(readFileSync(new URL("./package.json", import.meta.url), "utf-8"));
  const version = pkg.version || "unknown";

  const componentsDir = resolve(__dirname, "component");
  const componentDirs = readdirSync(componentsDir).filter((name) => {
    return statSync(resolve(componentsDir, name)).isDirectory();
  });

  const entries: Record<string, string> = {
    index: resolve(componentsDir, "index.ts"),
  };

  componentDirs.forEach((dir) => {
    const entryPath = resolve(componentsDir, dir, "index.ts");
    if (statSync(entryPath).isFile()) {
      entries[dir] = entryPath;
    }
  });
  console.log("Component entries:", entries);
  console.log("Building version:", version);
  return {
    build: {
      outDir: `dist/${version}`,
      cssCodeSplit: false,
      lib: {
        entry: entries,
        formats: ["es"],
        fileName: (format, entryName) => `${entryName}.${format}.js`,
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
        },
      },
    },
    css: {
      postcss: {
        plugins: [
          prefixer({
            prefix: stylePrefix,
            transform(prefix: string, selector: string, prefixedSelector: string) {
              if (selector === "body" || selector === "html") {
                return prefix;
              }
              return prefixedSelector;
            },
          }),
        ],
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      // vueDevTools(),
      cssInjectedByJsPlugin({
        jsAssetsFilterFunction: (outputChunk) => {
          // 只在 es 格式的入口文件中注入 CSS
          return outputChunk.fileName.endsWith(".es.js");
        },
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
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
