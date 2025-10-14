import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    // 库模式
    lib: {
      entry: ['ts/index.js'],
      name: 'index',
      formats: ['es', 'umd', 'iife']
    },
    rollupOptions: {
      // 确保外部化处理那些
      // 你不想打包进库的依赖
      external: ['echarts'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖
        // 提供一个全局变量
        globals: {
          echarts: 'echarts'
        }
      }
    }
  }
});

