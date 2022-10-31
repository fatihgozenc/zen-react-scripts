#!/usr/bin/env node
'use strict';

const args = process.argv.slice(2);

if (!args[0]) {
    process.stdout.write("You need to provide a command: build, dev, local, analyze");
    process.exit(1);
}

const { spawn } = require('child_process');
const path = require("path");

if (args[0] === "build") {
    startScript({ name: args[0], args: args.slice(1) });
} else if (args[0] === "dev") {
    startScript({ name: args[0], args: args.slice(1) });
} else if (args[0] === "local") {
    startScript({ name: args[0], args: args.slice(1) });
} else if (args[0] === "start") {
    startScript({ name: args[0], args: args.slice(1) });
}

function startScript({ name, args }) {
    const scriptPath = path.resolve(__dirname, "../", "scripts", name);
    const script = spawn('node', [scriptPath, ...args]);
    script.stdout.pipe(process.stdout);
    script.stderr.pipe(process.stderr);
}