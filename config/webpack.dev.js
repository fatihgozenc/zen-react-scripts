const webpack = require("webpack");
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ESLintPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const styleConfig = require("./webpack.styles");
const path = require("path");
const resolve = require('resolve');

const { existsSync } = require('fs');

const userDefinedConfigFilePath = `${process.cwd()}/webpack.config.js`;
let userDefinedConfig = {};
if (existsSync(userDefinedConfigFilePath)) {
    userDefinedConfig = require(userDefinedConfigFilePath);
    userDefinedConfig = userDefinedConfig.development ?? {};
}

module.exports = merge(common, {
    mode: "development",
    devtool: "source-map",
    output: {
        clean: false,
        filename: "static/js/[name].bundle.js",
        chunkFilename: "static/js/[name].chunk.js",
    },
    stats: process.argv.includes("--v") ? 'verbose' : 'minimal',
    watchOptions: {
        ignored: /node_modules/,
    },
    optimization: {
        usedExports: true,
    },
    module: {
        rules: [
            {
                test: /\.module(\.css|\.s[ac]ss)$/i,
                use: [
                    "style-loader", // Creates `style` nodes from JS strings
                    styleConfig.cssLoaderModuleDev,
                    "sass-loader"   // Compiles Sass to CSS
                ],
            },
            {
                test: /(\.css|\.s[ac]ss)$/i,
                exclude: /\.module(\.css|\.s[ac]ss)$/i,
                use: [
                    "style-loader", // Creates `style` nodes from JS strings
                    styleConfig.cssLoaderDefault,
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                config: path.resolve(__dirname, "postcss.config.js"),
                            },
                        }
                    },
                    "sass-loader"   // Compiles Sass to CSS
                ],
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            ...styleConfig.cssGlobalProviders,
            React: 'react',
            ReactDOM: 'react-dom',
        }),
        new ForkTsCheckerWebpackPlugin({
            async: true,
            typescript: {
              typescriptPath: resolve.sync('typescript', {
                basedir: "node_modules",
              }),
              configOverwrite: {
                compilerOptions: {
                  sourceMap: true,
                  skipLibCheck: true,
                  inlineSourceMap: false,
                  declarationMap: false,
                  noEmit: true,
                  incremental: true,
                },
              },
              context: "./src",
              diagnosticOptions: {
                syntactic: true,
              },
              mode: 'write-references',
              // profile: true,
            },
          }),
        new ESLintPlugin({
            context: "./src",
            fix: process.argv.includes("--fix") ? true : false
        })
    ],
    watchOptions: {
        // for some systems, watching many files can result in a lot of CPU or memory usage
        // https://webpack.js.org/configuration/watch/#watchoptionsignored
        // don't use this pattern, if you have a monorepo with linked packages
        ignored: /node_modules/,
    },
}, userDefinedConfig);