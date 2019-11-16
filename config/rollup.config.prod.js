import baseConfig from './rollup.config.base';
// import uglify from 'rollup-plugin-uglify';
import { name, version, author } from '../package.json';

// 代码头
const banner =
    `/*!
* ${name}.js v${version}
* (c) 2018-${new Date().getFullYear()}${author} Russell
* https://github.com/any86/any-touch
* Released under the MIT License.
*/`

export default {
    ...baseConfig,
    output: [
        { format: 'umd', file: `dist/${name}.js`, banner, sourcemap: true },
        { format: 'cjs', file: `dist/${name}.cjs.js`, banner, sourcemap: true },
        { format: 'es', file: `dist/${name}.es.js`, banner, sourcemap: true },
    ],
    plugins: [
        ...baseConfig.plugins,
    ]
};