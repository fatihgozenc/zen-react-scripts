module.exports = {
    compress: true,
    hot: true,
    liveReload: false,
    open: (process.argv.includes("--silent") 
    || process.argv.includes("-s")) ? false : true,
    port: 3000,
    client: {
        overlay: true
    },
    setupExitSignals: true,
    historyApiFallback: true,
    watchFiles: ["src/**"]
}