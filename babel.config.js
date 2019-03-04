module.exports = function (api) {
    api.cache(true)
    const presets = [
        ['@babel/preset-react'],
        ['@babel/preset-env', { forceAllTransforms: true }],
    ]

    const plugins = [
        [
            'import',
            {
              libraryName: 'antd',
              style: true,
              libraryDirectory: 'es'
            },
            'antd'
        ],
        ['@babel/plugin-proposal-object-rest-spread'],
        ['@babel/plugin-external-helpers'],
        ['@babel/plugin-transform-runtime'],
        [
            '@babel/plugin-proposal-decorators',
            {
              legacy: true
            }
        ],
        [
            'import',
            {
                libraryName: 'sep',
                customName: (name) => `@ele/sep/es/${name}`,
                libraryDirectory: 'es',
                style: true
            },
            'sep'
        ],
        '@babel/plugin-syntax-dynamic-import'
    ]

    return {
        presets,
        plugins,
        comments: false
    }
};