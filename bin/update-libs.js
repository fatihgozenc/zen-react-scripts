const package = require("../package.json");
const packageLock = require("../package-lock.json");
const { spawn } = require("child_process");
const fs = require("fs");
const chalk = require("chalk");
const ignoredLibs = ["chalk", "pretty-bytes"];
const packageString = package.toString();
const packageLockString = packageLock.toString();

const deps = package.dependencies
  ? Object.keys(package.dependencies)
      .filter((e) => !ignoredLibs.includes(e))
      .join(" ")
  : null;

execute(`npm remove ${deps}`)
  .then((out) => {
    console.log(out);
    console.log("Deleted deps.");
    return execute(`npm i ${deps}`);
  })
  .then((out) => {
    console.log(out);
    console.log("Re-Installed deps.");
  })
  .catch((err) => {
    console.error(err);
    resetPackageJson();
    process.exit(1);
  });

async function execute(command) {
  return new Promise((resolve, reject) => {
    const exe = spawn(command, { shell: true });
    exe.stdout.on("data", (data) => {
      process.stdout.write(chalk.green(data.toString()));
    });
    exe.stderr.on("data", (data) => {
      process.stdout.write(chalk.yellow(data.toString()));
    });
    exe.on("close", (code) => {
      if (code === 0) {
        resolve("\n");
      } else {
        reject(`child process exited with code ${code}`);
      }
    });
  });
}

function resetPackageJson() {
  fs.writeFileSync("../package.json", packageString, { encoding: "utf8" });
  fs.writeFileSync("../package-lock.json", packageLockString, {
    encoding: "utf8",
  });
}
