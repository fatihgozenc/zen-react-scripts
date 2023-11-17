const package = require("../package.json");
const packageLock = require("../package-lock.json");
const { exec } = require("child_process");
const fs = require("fs");
const ignoredLibs = ["chalk", "pretty-bytes"];
const packageString = package.toString();
const packageLockString = packageLock.toString();

const deps = package.dependencies
  ? Object.keys(package.dependencies)
      .filter((e) => !ignoredLibs.includes(e))
      .join(" ")
  : null;
const ddeps = package.devDependencies
  ? Object.keys(package.devDependencies)
      .filter((e) => !ignoredLibs.includes(e))
      .join(" ")
  : null;

execute(`npm remove ${ddeps}`)
  .then((out) => {
    console.log(out);
    console.log("Deleted ddeps.");
    return execute(`npm remove ${deps}`);
  })
  .then((out) => {
    console.log(out);
    console.log("Deleted deps.");
    return execute(`npm i ${deps}`);
  })
  .then((out) => {
    console.log(out);
    console.log("Re-Installed deps.");
    return execute(`npm i -D ${ddeps}`);
  })
  .then((out) => {
    console.log(out);
    console.log("Re-Installed ddeps.");
  })
  .catch((err) => {
    console.error(err);
    resetPackageJson();
    process.exit(1);
  });

async function execute(command) {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) reject(error);
      resolve(stdout.trim());
    });
  });
}

function resetPackageJson() {
  fs.writeFileSync("../package.json", packageString, { encoding: "utf8" });
  fs.writeFileSync("../package-lock.json", packageLockString, {
    encoding: "utf8",
  });
}
