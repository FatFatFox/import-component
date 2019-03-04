import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import postcss from 'rollup-plugin-postcss';
import commonjs from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import json from 'rollup-plugin-json';

export default {
    input: './src/Filter.js',
    output: {
        file: './dist/index.js',
        format: 'es',
    },
    external: ['antd'],
    plugins: [
        resolve(), 
        postcss({
            extensions: [ '.css', '.less' ],
        }),
        babel({
            exclude: 'node_modules/**',
            runtimeHelpers: true,
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-external-helpers','@babel/plugin-transform-runtime','@babel/plugin-proposal-class-properties'], // 你需要安装babel插件来解析ES6  
        }),
        commonjs(),
        replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
        json(),
    ],
};