const { readFileSync } = require("fs");
const { resolve } = require("path");

const baseConfig = {
  compress: true,
  hot: true,
  liveReload: false,
  open:
    process.argv.includes("--silent") || process.argv.includes("-s")
      ? false
      : true,
  port: 3000,
  client: {
    overlay: true,
  },
  setupExitSignals: true,
  historyApiFallback: true,
  watchFiles: ["src/**"],
};

const httpsConfig = {
  https: {
    key: readFileSync(resolve(__dirname, "cert.key")),
    cert: readFileSync(resolve(__dirname, "cert.crt")),
    ca: readFileSync(resolve(__dirname, "ca.crt")),
  },
};

module.exports = process.argv.includes("--https")
  ? { ...baseConfig, ...httpsConfig }
  : baseConfig;
