import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import { resolve } from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true, // 在 package.json 中自动插入类型声明入口
      outDir: './dist/types', // 指定输出目录为 types
      include: ['ts/**/*'], // 包含 ts 目录下的所有文件
      exclude: ['**/*.test.ts', '**/*.spec.ts'], // 排除测试文件
      rollupTypes: true // 生成统一的类型声明文件
    })
  ],
  build: {
    minify: false, // 关闭代码压缩
    target: 'es2015',
    lib: {
      // 库模式
      entry: resolve(__dirname, 'ts/index.ts'),
      name: 'MPTools', // UMD 时使用的全局变量名
      fileName: (format) => {
        if (format === 'umd') return `index.umd.js`;
        if (format === 'es') return `index.js`;
        if (format === 'cjs') return `index.cjs`;
        return `index.${format}.js`;
      },
      formats: ['es', 'umd', 'cjs'] // 打包格式
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
