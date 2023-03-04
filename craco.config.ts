const path = require('path');
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin');
const WebpackBar = require('webpackbar');
const sassResourcesLoader = require('craco-sass-loader');
const CompressionPlugin = require('compression-webpack-plugin');
const CracoPluginScopedCss = require('craco-plugin-scoped-css');

const resolve = (dir: string) => path.resolve(__dirname, dir);
const { REACT_APP_API_URL, NODE_ENV } = process.env;

module.exports = {
    style: {
        postcss: {
            mode: 'extends',
            loaderOptions: {
                postcssOptions: {
                    ident: 'postcss',
                    plugins: [
                        [
                            'postcss-px-to-viewport-8-plugin',
                            {
                                unitToConvert: 'px', // 需要转换的单位，默认为"px"
                                viewportWidth: 375, // 视窗的宽度，对应h5设计稿的宽度，一般是375
                                // viewportHeight: 667,// 视窗的高度，对应的是我们设计稿的高度
                                unitPrecision: 3, // 单位转换后保留的精度
                                propList: [
                                    // 能转化为vw的属性列表
                                    '*',
                                ],
                                viewportUnit: 'vw', // 希望使用的视口单位
                                fontViewportUnit: 'vw', // 字体使用的视口单位
                                selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。cretae
                                minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
                                mediaQuery: false, // 媒体查询里的单位是否需要转换单位
                                replace: true, // 是否直接更换属性值，而不添加备用属性
                                // exclude: /(\/|\\)(node_modules)(\/|\\)/, // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
                            },
                        ],
                        ['autoprefixer'],
                        [
                            'postcss-custom-properties',
                            {
                                preserve: false,
                            },
                        ],
                    ],
                },
            },
        },
    },
    webpack: {
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
        alias: {
            '@': resolve('src'),
        },
        plugins: {
            add: [
                new WindiCSSWebpackPlugin({
                    virtualModulePath: 'src',
                }),
                new WebpackBar({
                    profile: true,
                    name: 'webpack',
                    color: 'green',
                }),
            ],
        },
        configure: (webpackConfig: any, { env, paths }: any) => {
            // 修改build的生成文件名称
            paths.appBuild = 'dist';
            webpackConfig.output = {
                ...webpackConfig.output,
                path: resolve('dist'),
                publicPath: '/',
                pathinfo: false,
            };

            if (NODE_ENV === 'production') {
                webpackConfig.plugins = webpackConfig.plugins.concat(
                    //开启Gzip
                    new CompressionPlugin({
                        algorithm: 'gzip',
                        threshold: 10240,
                        minRatio: 0.8,
                    }),
                );
            }

            return webpackConfig;
        },
    },
    plugins: [
        {
            plugin: sassResourcesLoader,
            options: {
                resources: './src/assets/scss/index.scss', //设置公共scss
            },
        },
        {
            plugin: CracoPluginScopedCss,
        },
    ],

    devServer: {
        port: 8000,
        hot: true,
        proxy: {
            '/api': {
                target: REACT_APP_API_URL,
                changeOrigin: true,
                logLevel: 'debug',
                headers: {
                    Cookie: '',
                },
                pathRewrite: {
                    '^': '',
                },
            },
        },
    },
};
