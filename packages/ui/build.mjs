import { build } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const componentsDir = resolve(__dirname, 'components')
const componentDirs = fs.readdirSync(componentsDir).filter((name) => {
  return fs.statSync(resolve(componentsDir, name)).isDirectory()
})

const entries = ['index', ...componentDirs]

async function buildAll() {
  for (let i = 0; i < entries.length; i++) {
    const name = entries[i]
    const isIndex = name === 'index'
    const entryPath = isIndex ? resolve(__dirname, 'index.ts') : resolve(componentsDir, name, 'index.ts')
    
    await build({
      configFile: false,
      plugins: [
        vue(),
        dts({
          include: isIndex ? ['**/*.ts', '**/*.vue', 'components/**/*.vue', 'components/**/*.ts'] : [`components/${name}/**/*.ts`, `components/${name}/**/*.vue`],
          outDir: 'dist',
          rollupTypes: true,
        })
      ],
      build: {
        emptyOutDir: isIndex, // Only empty before the first build
        lib: {
          entry: entryPath,
          name: isIndex ? 'IChainUI' : `IChain${name.charAt(0).toUpperCase() + name.slice(1)}`,
          formats: ['es', 'cjs'],
          fileName: (format) => `${isIndex ? 'index' : name}/index.${format}.js` // e.g. dist/button/index.es.js
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue'
            },
            exports: 'named',
            assetFileNames: `${isIndex ? 'index' : name}/style.[ext]`
          }
        }
      }
    })
  }
}

buildAll()
