#!/usr/bin/env node
'use strict';

const args = process.argv.slice(2);
if(!args[0]) {
    process.stdout.write("You need to provide a command: build, dev, local, analyze");
    process.exit(1);
}
const { spawn } = require('child_process');
const path = require("path");

function startScript(name) {
    const scriptPath = path.resolve(__dirname, "../", "scripts", name);
    const script = spawn('node', [scriptPath]);

    script.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    script.stderr.on('data', (data) => {
        process.stdout.write(data);
    });

    script.on('close', (code) => {
        process.stdout.write(`child process exited with code ${code}`);
    });
}

if(args[0] === "build") {
    startScript(args[0]);
} else if(args[0] === "dev") {
    startScript(args[0]);
} else if(args[0] === "local") {
    startScript(args[0]);
}