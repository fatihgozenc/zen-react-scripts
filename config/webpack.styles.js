const path = require("path");
const globalCssModulePath = path.resolve(__dirname, "globals", "globals.module.scss");
const globalUtilitiesPath = path.resolve(__dirname, "webpack.globals.js");

module.exports = {
    cssLoaderModule: {
        loader: "css-loader",
        options: {
            importLoaders: 1,
            sourceMap: true,
            url: false,
            modules: {
                localIdentName: '[sha1:hash:hex:5]'
            }
        }
    },
    cssLoaderModuleDev: {
        loader: "css-loader",
        options: {
            importLoaders: 1,
            sourceMap: true,
            url: false,
            modules: {
                localIdentName: "[name]__[local]",
            }
        }
    },
    cssLoaderDefault: {
        loader: "css-loader",
        options: {
            importLoaders: 1,
            sourceMap: true,
            url: false,
        }
    },
    cssGlobalProviders: {
        css: [globalCssModulePath, "default"],
        classes: [globalUtilitiesPath, "classes"]
    }
};