import baseConfig from './rollup.config.base';
// import uglify from 'rollup-plugin-uglify';
import { name, version, author } from '../package.json';

import babel from 'rollup-plugin-babel';



export default {
    ...baseConfig,
    input: './src/worker/index.ts',
    output: [
        { format: 'es', file: `dist/${name}.es.js`, sourcemap: true },
    ],
    plugins: [
        ...baseConfig.plugins,
    ]
};