const open = require('open');
const { spawn } = require("child_process");
const servor = require('servor');
const EventEmitter = require('events');

const LOCAL_BUILD_URL = "http://localhost:3001/index.html";
const startTime = Date.now();

const Builder = spawn(process.argv[0], [__dirname + "/build.js"], {
    detached: true,
    stdio: 'inherit'
});
const Events = new EventEmitter();
Builder.on("exit", () => Events.emit("build_end"));

Events.on('build_end', () => {
    const builtTime = Date.now();
    console.log(`Built in in ${(builtTime - startTime) / 1000}ms.`);
    console.log(`Starting server on http://localhost:3001`);
    servor({
        root: './build',
        fallback: './build/index.html',
        module: false,
        inject: `<script>window.location.href="http://localhost:3001/index.html"</script>`,
        static: true,
        credentials: null,
        port: 3001,
    });
    Events.emit('server_ready');
});

Events.on("server_ready", () => {
    console.log(`Server ready, opening browser...`);
    open(LOCAL_BUILD_URL);
});
