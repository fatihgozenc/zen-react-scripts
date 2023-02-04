module.exports = {
    compress: true,
    hot: true,
    liveReload: false,
    open: true,
    port: 3000,
    client: {
        overlay: true
    },
    setupExitSignals: true,
    historyApiFallback: true,
    watchFiles: ["src/**"]
}