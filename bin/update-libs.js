const package = require("../package.json");
const { exec } = require('child_process');

const ignoredLibs = ["chalk", "pretty-bytes"];

const deps = package.dependencies
    ? Object.keys(package.dependencies).filter(e => !ignoredLibs.includes(e)).join(" ")
    : null;
const ddeps = package.devDependencies
    ? Object.keys(package.devDependencies).filter(e => !ignoredLibs.includes(e)).join(" ")
    : null;

execute(`npm remove ${ddeps}`)
    .then(() => {
        console.log("Deleted ddeps.");
        return execute(`npm remove ${deps}`);
    })
    .then(() => {
        console.log("Deleted deps.");
        if (!ddeps) {
            process.exit(0);
        }
        return execute(`npm i ${deps}`);
    })
    .then(() => {
        console.log("Re-Installed deps.");
        return execute(`npm i -D ${ddeps}`);
    })
    .then(() => {
        console.log("Re-Installed ddeps.");
    });

async function execute(command) {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) reject(error);
            resolve(stdout.trim());
        });
    });
}