import express, { Application } from 'express';
import http, { Server } from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';

class SocketServer {
    private app: Application;
    private server: Server;
    private io: SocketIOServer;

    constructor() {
        this.app = express();
        this.server = http.createServer(this.app);
        this.io = new SocketIOServer(this.server);
        this.configureRoutes();
        this.handleSocketEvents();
    }

    private configureRoutes(): void {
        this.app.get('/', (req, res) => {
            res.send('Socket.IO server is running');
        });
    }

    private handleSocketEvents(): void {
        this.io.on('connection', (socket: Socket) => {
            console.log('A client connected');

            socket.on('chat message', (msg: string) => {
                console.log('Message: ' + msg);
                this.io.emit('chat message', msg);
            });

            socket.on('disconnect', () => {
                console.log('A client disconnected');
            });
        });
    }

    public start(port: number): void {
        this.server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
}

