#Zen React Scripts

[webpack@5](https://github.com/webpack/webpack) scripts for building and developing React SPA's. Works great with [create-zen-app](https://github.com/fatihgozenc/create-zen-app) which is based on this repo for webpack scripts and configuration. Inspired from [react-scripts](https://github.com/facebook/create-react-app/tree/main/packages/react-scripts).

This project aims to contain have latest updates from all dependencies to be secure and prevent any warning on actions or npm/yarn log messages.

##Available Commands

###dev
Starts project for development on `http://localhost:3000`.

###build
Builds the react project for deployment.

####--hash
Builds with a unique hash like `app.9dbf42.js`. If not specified it uses `[fullhash:8]` which is a common hash usage in webpack configs. More configurability will be added in future.

####--analyze
Builds and creates a report on `http://localhost:3002`

<!-- ####--obfuscate
Obfuscates all JS code with hexes. -->

###local
Builds the project and runs an instance on `http://localhost:3001`