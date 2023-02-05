# Zen React Scripts

[webpack@5](https://github.com/webpack/webpack) scripts for building and developing React SPA's. Works great with [create-zen-app](https://github.com/fatihgozenc/create-zen-app) which is based on this repo for webpack scripts and configuration. Inspired from [react-scripts](https://github.com/facebook/create-react-app/tree/main/packages/react-scripts).

This project aims to contain have latest updates from all dependencies to be secure and prevent any warning on actions or npm/yarn log messages.

Also you're able to use Web Workers with TypeScript with this.

## Install

Final build will be compiled into [preact](https://preactjs.com/) and [@babel/runtime](https://babeljs.io/docs/en/babel-runtime) will optimize re-use of classes in runtime. So:
``` 
yarn add preact @babel/runtime 
```
``` 
npm i preact @babel/runtime 
```

then you're ready to go:
``` 
yarn add -D zen-react-scripts 
```
```
npm i -D zen-react-scripts
```
<br/>

### Folder Structure

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── .eslintrc.json
├── .env
├── public
│   ├── manifest.json
│   └── index.html
└── src
    ├── components/
    ├── App.tsx
    ├── preload.js
    ├── index.js
    └── logo.svg
```
<br/>

### Sample config for package.json
```json
    "scripts": {
        "dev": "zen-react-scripts dev",
        "build": "zen-react-scripts build",
        "local": "zen-react-scripts local"
    }
    "browserslist": "edge >= 13, firefox >= 50, and_ff >= 50, chrome >= 49, and_chr >= 49, ios >= 9.4, safari >= 9.4, samsung >= 5, and_uc >= 11.8, opera >= 40, op_mob >= 40, baidu >= 7"
```

## Environment Files
By default `.env` file will be checked for environment variables. If you place `.env.production` or `.env.development`, these files will overwrite default `.env` file that you've placed before.

## Commands

### dev
Starts project for development on `http://localhost:3000` and opens a tab in your default browser.

#### --silent or -s
Starts development server in the background, without creating a tab or opening the browser. Useful for testing.

### build
Builds the react project for deployment. Will be placed in `./build/`

### local
Builds the project and starts an instance on `http://localhost:3001` via a basic `express` static server. Useful for checking the build on production environment.

### start
Starts built project for production on `http://localhost:3001`.

#### --hash
Builds your app with a unique random hash like `app.9dbf42.js` in all of your assets. If not specified it uses `[contenthash:6]` which only changes when you change the content of the file.
via NPM
```
npm run build -- --hash
```
via Yarn
```
yarn build --hash
```
<br/>

#### --analyze
Builds and creates a report on `http://localhost:3002`

via NPM
```
npm run build -- --analyze
```
via Yarn
```
yarn build --analyze
```
<br/>

## Custom Webpack Configuration

You can overwrite the custom configuration of your app via placing `webpack.config.js` in your project root. Webpack configurations can passed inside `production` and `development` keys in object.
```js
module.exports = {
  production: {
    output: {
      publicPath: "/yourDesiredPath/",
    },
  },
  development: {
    devtool: "source-map",
  }
};
```
<br/>

## Web Workers with React

Now you can start using Web Workers! Two things are important here: Files that contain a Web Worker must end with `*.worker.ts`, and they
must start with the following two lines of code in order to work nicely together with TypeScript:

```ts
declare const self: DedicatedWorkerGlobalScope;
export default {} as typeof Worker & { new (): Worker };

// Your code ...
```

In your application, you can import your Web Workers like a normal module, and instantiate them as a class. For example:

```ts
import MyWorker from './MyWorker.worker';

const myWorkerInstance: Worker = new MyWorker();
```
<br/>

## Loading Custom Font Files
Loading custom files via URL relies on relative paths in your file tree. An example with file tree is here:
```scss
// src/styles/main.scss
@font-face {
    font-family: "FFMark";
    src: url("./fonts/ffmark.woff2");
}
```
```

└─ src
  ├── components/
  ├── styles/
  │   ├── fonts/
  │   │   └── ffmark.woff2
  │   └── main.sscs
  ├── App.tsx
  └── index.js
```
<br/>