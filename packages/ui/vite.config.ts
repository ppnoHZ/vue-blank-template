import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import * as fs from "fs";

const componentsDir = resolve(__dirname, "components");
const componentDirs = fs.readdirSync(componentsDir).filter((name) => {
  return fs.statSync(resolve(componentsDir, name)).isDirectory();
});

const entries: Record<string, string> = {
  index: resolve(__dirname, "index.ts"),
};

componentDirs.forEach((dir) => {
  entries[dir] = resolve(componentsDir, dir, "index.ts");
});

export default componentDirs.map((dir) => {
  return defineConfig({
    plugins: [
      vue(),
      dts({
        include: [`components/${dir}/**/*.ts`, `components/${dir}/**/*.vue`],
        outDir: `dist/${dir}`,
        rollupTypes: true,
      }),
    ],
    build: {
      outDir: `dist/${dir}`,
      lib: {
        entry: resolve(componentsDir, dir, "index.ts"),
        name: `IChain${dir.charAt(0).toUpperCase() + dir.slice(1)}`,
        formats: ["es", "cjs"],
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        external: ["vue"],
        output: {
          globals: {
            vue: "Vue",
          },
          exports: "named",
          assetFileNames: "style.[ext]",
        },
      },
    },
  });
});
