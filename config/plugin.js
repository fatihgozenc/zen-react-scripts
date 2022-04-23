// If your plugin is direct dependent to the html webpack plugin:
const HtmlWebpackPlugin = require('html-webpack-plugin');
// If your plugin is using html-webpack-plugin as an optional dependency
// you can use https://github.com/tallesl/node-safe-require instead:
// const HtmlWebpackPlugin = require('safe-require')('html-webpack-plugin');

class HtmlWebpackAsyncDeferPlugin {
    options = null;
    constructor(options) {
        this.options = options;
    }
    apply(compiler) {
        compiler.hooks.compilation.tap('HtmlWebpackAsyncDeferPlugin', (compilation) => {
            // Static Plugin interface |compilation |HOOK NAME | register listener 
            HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync(
                'HtmlWebpackAsyncDeferPlugin', // <-- Set a meaningful name here for stacktraces
                (data, cb) => {
                    const scripts = data.html.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gm);
                    if(!scripts) {
                        throw new Error(`There are no chunk entry points.`);
                    }
                    if(this.options.async && this.options.async.length > 0) {
                        this.options.async.forEach(chunk => {
                            data.html = this.replace(chunk, scripts, data.html, "async");
                        });
                    }
                    if(this.options.blocking && this.options.blocking.length > 0) {
                        this.options.blocking.forEach(chunk => {
                            data.html = this.replace(chunk, scripts, data.html);
                        });
                    }
                    cb(null, data);
                }
            );
        });
    }

    replace(chunk, scripts, html, attr = "") {
        const asyncScript = scripts.find(s => {
            const srcMatch = s.match(/src\s*=\s*"(.+?)"/g).pop();
            return srcMatch.includes(chunk);
        });
        return html.replace(asyncScript, asyncScript.replace("script defer", `script ${attr}`));
    }
}

module.exports = HtmlWebpackAsyncDeferPlugin;