const open = require('open');
const path = require("path");
const EventEmitter = require('events');
const express = require("express");

const PORT = 3001;
const LOCAL_BUILD_URL = `http://localhost:${PORT}`;

const Events = new EventEmitter();

console.log(`Starting server on ${LOCAL_BUILD_URL}`);

const app = express();
app.use(express.static("build"));
app.get('*', (req, res) => res.sendFile(path.resolve('build', 'index.html')));
app.listen(PORT, () => {
    Events.emit('server_ready');
});

Events.on("server_ready", () => {
    console.log(`Server ready, opening browser...`);
    open(LOCAL_BUILD_URL);
});
