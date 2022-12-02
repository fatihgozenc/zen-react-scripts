const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const InterpolateHtmlPlugin = require("@gozenc/interpolate-html-plugin");
const { existsSync } = require("fs");

const appPath = path.resolve("src", "index.js");
const preloadPath = path.resolve("src", "preload.js");

const entryPoints = existsSync(preloadPath)
    ? { preload: preloadPath, app: appPath, }
    : { app: appPath, };

module.exports = {
    entry: entryPoints,
    target: "browserslist",
    output: {
        path: path.resolve("build"),
        publicPath: "/",
    },
    resolve: {
        fallback: {
            dgram: false,
            fs: false,
            net: false,
            tls: false,
            child_process: false,
            __dirname: false
        },
        modules: ["node_modules"],
        extensions: [
            ".web.ts", ".ts", ".web.tsx", ".tsx",
            ".web.js", ".js", ".web.jsx", ".jsx",
            ".json"
        ]
    },
    module: {
        rules: [
            {
                test: /\.(worker)\.ts$/,
                use: 'worker-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(tsx|ts)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve("src"),
                use: {
                    loader: "babel-loader",
                    options: {
                        exclude: [
                            /node_modules[\\\/]core-js/,
                            /node_modules[\\\/]webpack[\\\/]buildin/,
                        ],
                        presets: ["@babel/preset-react"],
                        plugins: [
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif|woff|woff2|ttf|eot)$/i,
                type: "asset/resource",
                generator: {
                    filename: "public/[name][ext]",
                }
            },
        ]
    },
    plugins: [
        new Dotenv(),
        // new webpack.ProgressPlugin(),
        new HtmlWebpackPlugin({
            title: "Zen App",
            template: path.resolve("public", "index.html"),
            minify: false,
            meta: {
                viewport: "viewport-fit=cover, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
                "theme-color": "#fff",
            }
        }),
        new InterpolateHtmlPlugin(
            HtmlWebpackPlugin, { VALUE: null }
        ),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: "./public",
                    to: "./public",
                    globOptions: {
                        ignore: [
                            "**/*.html",
                        ],
                    },
                }
            ],
        }),
        new WebpackManifestPlugin({
            fileName: "assets.json"
        }),
    ]
};