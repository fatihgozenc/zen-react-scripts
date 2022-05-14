const WebpackObfuscator = require('webpack-obfuscator');
const WorkboxPlugin = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const TerserPlugin = require("terser-webpack-plugin");
const webpack = require("webpack");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");
const styleConfig = require("./webpack.styles");
const crypto = require("crypto");

const isAnalyze = process.argv.includes("--analyze");
const isHash = process.argv.includes("--hash");
const hash = isHash ? crypto.randomBytes(3).toString("hex") : "[fullhash:8]";

module.exports = merge(common, {
    mode: "production",
    devtool: false,
    devServer: {
        hot: true,
    },
    output: {
        clean: true,
        filename: `static/js/[name].${hash}.js`,
        chunkFilename: `static/js/[name].${hash}.chunk.js`,
    },
    resolve: {
        alias: {
            "react": "preact/compat",
            "react-dom/test-utils": "preact/test-utils",
            "react-dom": "preact/compat",
            "react/jsx-runtime": "preact/jsx-runtime"
        }
    },
    module: {
        rules: [
            {
                test: /\.module(\.css|\.s[ac]ss)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    styleConfig.cssLoaderModule,
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: "compressed",
                            },
                        }
                    }
                ],
            },
            {
                test: /(\.css|\.s[ac]ss)$/i,
                exclude: /\.module(\.css|\.s[ac]ss)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    styleConfig.cssLoaderDefault,
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, "postcss.config.js"),
                            },
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true,
                            sassOptions: {
                                outputStyle: "compressed",
                            },
                        }
                    }
                ],
            }
        ]
    },
    optimization: {
        moduleIds: false,
        splitChunks: {
            chunks: "all",
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    // cacheGroupKey here is `commons` as the key of the cacheGroup
                    name(module, chunks, cacheGroupKey) {
                        const moduleName = module.identifier()
                            .split("/node_modules/").pop().replace(/@/g, "").replace(/\//g, "~");
                        // .split("/node_modules/").pop().replace(/@|\.js|\.min\.js/g, "").replace(/\//g, "~")
                        console.log("Compiling", moduleName);
                        return `deps/${moduleName}`;
                    },
                    chunks: 'all'
                },
            },
        },
        runtimeChunk: {
            name: "runtime"
        },
        minimizer: [
            new TerserPlugin({
                test: /\.js(\?.*)?$/i,
                parallel: true,
                terserOptions: {
                    format: {
                        comments: false,
                    },
                    compress: {
                        drop_console: false
                    }
                }
            }),
            new CssMinimizerPlugin(),
        ]
    },
    plugins: isAnalyze ? [
        ...getPlugins(),
        new webpack.ProgressPlugin(),
        new BundleAnalyzerPlugin({
            analyzerHost: "localhost",
            analyzerPort: 3002,
            reportFilename: "./report.html"
        })
    ] : getPlugins()
});

function getPlugins() {
    return [
        new MiniCssExtractPlugin({
            ignoreOrder: true,
            linkType: "text/css",
            // filename: "[name].[fullhash].css",
            // chunkFilename: "[id].[fullhash].css",
            filename: `static/css/[name].${hash}.css`,
            chunkFilename: `static/css/[name].${hash}.chunk.css`,
        }),
        new webpack.ProvidePlugin({
            ...styleConfig.cssGlobalProviders,
            React: 'preact/compat',
            ReactDOM: 'preact/compat',
        }),
        new webpack.ids.DeterministicModuleIdsPlugin({
            maxLength: 5,
        }),
        // new WebpackObfuscator({
        //     rotateStringArray: true
        // })
        // new WorkboxPlugin.GenerateSW({
        //     // these options encourage the ServiceWorkers to get in there fast
        //     // and not allow any straggling "old" SWs to hang around
        //     clientsClaim: true,
        //     skipWaiting: true,
        // }),
    ];
}
