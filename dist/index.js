"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cluster_1 = __importDefault(require("cluster"));
const os_1 = __importDefault(require("os"));
const express_1 = __importDefault(require("express"));
const numCPUs = os_1.default.cpus().length;
const port = 3000;
if (cluster_1.default.isMaster) {
    console.log(`Master ${process.pid} is running`);
    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
    });
}
else {
    // Workers can share any TCP connection
    // In this case it is an HTTP server
    const app = (0, express_1.default)();
    app.get('/', (req, res) => {
        res.send('Hello World!');
    });
    app.listen(port, () => {
        console.log(`Worker ${process.pid} started`);
    });
}
