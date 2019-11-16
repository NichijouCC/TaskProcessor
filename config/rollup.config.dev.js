import baseConfig from './rollup.config.base';
import { name } from '../package.json';

export default {
    ...baseConfig,
    output: [
        { format: 'es', file: `dist/${name}.es.js`, sourcemap: true },
    ],
    plugins: [
        ...baseConfig.plugins,
    ]
};