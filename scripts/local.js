const util = require('util');
const exec = util.promisify(require('child_process').exec);
const open = require('open');

exec("node " + __dirname + "/build")
    .then(val => {
        open("http://localhost:3001");
        return exec("http-server-pwa -p 3001 build");
    });
