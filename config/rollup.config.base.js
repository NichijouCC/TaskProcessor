// ts转js的编译器
import typescript from 'rollup-plugin-typescript2';
// 代码生成sourcemaps
import sourceMaps from 'rollup-plugin-sourcemaps'
// 支持加载json文件
import json from 'rollup-plugin-json';
// 读取package.json
import { name } from '../package.json';

export default {
    input: './src/main.ts',
    output: [
        { format: 'umd', file: `dist/${name}.js`, sourcemap: true },
        { format: 'cjs', file: `dist/${name}.cjs.js`, sourcemap: true },
        { format: 'es', file: `dist/${name}.es.js`, sourcemap: true },
    ],
    plugins: [
        json(),
        typescript({
            useTsconfigDeclarationDir: true,
            exclude: 'node_modules/**',
            tsconfig: "./tsconfig.json",
        }),
        // Resolve source maps to the original source
        sourceMaps(),
    ],
};