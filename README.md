# Zen React Scripts

[webpack@5](https://github.com/webpack/webpack) scripts for building and developing React SPA's. Works great with [create-zen-app](https://github.com/fatihgozenc/create-zen-app) which is based on this repo for webpack scripts and configuration. Inspired from [react-scripts](https://github.com/facebook/create-react-app/tree/main/packages/react-scripts).

This project aims to contain have latest updates from all dependencies to be secure and prevent any warning on actions or npm/yarn log messages.

Also you're able to use Web Workers with TypeScript with this.

## Install

Final build will be compiled into [preact](https://preactjs.com/) and [@babel/runtime](https://babeljs.io/docs/en/babel-runtime) will optimize re-use of classes in runtime. So:
``` yarn add preact @babel/runtime ```
``` npm install preact @babel/runtime ```

then you're ready to go:
``` yarn add -D zen-react-scripts ```
``` npm install -D zen-react-scripts ```

#### Folder Structure

```
my-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
├── .eslintrc.json
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

#### Sample config for package.json
```
    "scripts": {
        "dev": "yarn zen-react-scripts dev",
        "build": "yarn zen-react-scripts build",
        "local": "yarn zen-react-scripts local"
    }
    "browserslist": "edge >= 13, firefox >= 50, and_ff >= 50, chrome >= 49, and_chr >= 49, ios >= 9.4, safari >= 9.4, samsung >= 5, and_uc >= 11.8, opera >= 40, op_mob >= 40, baidu >= 7"
```

## Commands

### dev
Starts project for development on `http://localhost:3000`.

### build
Builds the react project for deployment. Will be placed in `./build/`

### start
Starts built project for production on `http://localhost:3001`.

### local
Builds the project and starts an instance on `http://localhost:3001`

#### --hash
Builds with a unique hash like `app.9dbf42.js`. If not specified it uses `[fullhash:8]` which is a common hash usage in webpack configs. More configurability will be added in future.

#### --analyze
Builds and creates a report on `http://localhost:3002`

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
