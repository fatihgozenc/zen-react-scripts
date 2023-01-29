const path = require("path");
const globalCssModulePath = path.resolve(__dirname, "globals", "globals.module.scss");
const globalUtilitiesPath = path.resolve(__dirname, "webpack.globals.js");

module.exports = {
    cssLoaderModule: {
        loader: "css-loader",
        options: {
            importLoaders: 1,
            sourceMap: true,
            modules: {
                localIdentName: '[sha1:hash:hex:5]'
            }
        }
    },
    cssLoaderModuleDev: {
        loader: "css-loader",
        options: {
            importLoaders: 2,
            sourceMap: true,
            modules: {
                localIdentName: "[name]__[local]",
            }
        }
    },
    cssLoaderDefault: {
        loader: "css-loader",
        options: {
            importLoaders: 2,
            sourceMap: true,
        }
    },
    cssGlobalProviders: {
        css: [globalCssModulePath, "default"],
        classes: [globalUtilitiesPath, "classes"]
    }
};