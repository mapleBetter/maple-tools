import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // 库模式
    lib: {
      entry: resolve(__dirname, 'ts/index.ts'),
      name: 'mapleTools', // UMD 时使用的全局变量名
      fileName: (format) => {
        if (format === 'umd') return `index.js`;
        if (format === 'es') return `index.esm.js`;
        return `index.${format}.js`;
      },
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['echarts'], // 你不想打包进库的依赖
      output: {
        globals: {
          echarts: 'echarts' //在 UMD 构建模式下为这些外部化的依赖,提供一个全局变量
        }
      }
    }
  }
});

