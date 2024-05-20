"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Locals_1 = __importDefault(require("./Locals"));
const Kernel_1 = __importDefault(require("../middlewares/Kernel"));
const Routes_1 = __importDefault(require("./Routes"));
const Passport_1 = __importDefault(require("./Passport"));
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const prismaDb_1 = __importDefault(require("../configs/prismaDb"));
class Express {
    /**
     * contructor
     */
    constructor() {
        this.express = (0, express_1.default)();
        this.mountMiddleware();
        this.mountPassport();
        this.mountRouter();
        this.createWS();
    }
    /**
     * middleware
     */
    mountMiddleware() {
        this.express = Kernel_1.default.init(this.express);
    }
    /**
     * Router
     */
    mountRouter() {
        this.express = Routes_1.default.mountWeb(this.express);
    }
    /**
     * passport
     */
    mountPassport() {
        this.express = Passport_1.default.init(this.express);
    }
    createWS() {
        this.server = http_1.default.createServer(this.express);
        this.io = new socket_io_1.Server(this.server, {
            path: "/socket.io",
            cors: {
                origin: Locals_1.default.config().url_client
            }
        });
        console.log('create ws success!');
    }
    /**
     * run server
     */
    init() {
        const port = Locals_1.default.config().port;
        // websoket
        this.io.on("connection", (socket) => {
            // thêm địa chỉ người dùng vào db
            console.log('Có thằng nào đấy đang vào trang web bằng thiết bị id: ', socket.id);
            let CheckSoketId = null;
            socket.on('userinfor', (data) => __awaiter(this, void 0, void 0, function* () {
                console.log(data);
                // lưu vào db id socket
                if (CheckSoketId === socket.id) {
                    // kiểm tra nếu như vẫn là id cũ thì bỏ qua
                    console.log(`ID Người dùng${data.name} đã được lưu vào database`);
                }
                else {
                    // lưu 
                    yield prismaDb_1.default.websoket.create({
                        data: {
                            userId: data.userId,
                            soketId: socket.id
                        }
                    });
                    console.log(`Người dùng tên : ${data.name} đã đăng nhập bằng thiết bị id:  ${socket.id}`);
                    CheckSoketId = socket.id;
                }
            }));
            socket.on('log-out', () => __awaiter(this, void 0, void 0, function* () {
                CheckSoketId = null;
                // check
                const checkSocketExistDatabase = yield prismaDb_1.default.websoket.findUnique({
                    where: {
                        soketId: socket.id
                    }
                });
                // xóa bản ghi chứ id socket cũ 
                if (checkSocketExistDatabase) {
                    yield prismaDb_1.default.websoket.delete({
                        where: {
                            soketId: socket.id
                        }
                    });
                }
                console.log(`Người dùng thiết bị ${socket.id} đăng xuất `);
            }));
            socket.on('disconnect', () => __awaiter(this, void 0, void 0, function* () {
                CheckSoketId = null;
                // check
                const checkSocketExistDatabase = yield prismaDb_1.default.websoket.findUnique({
                    where: {
                        soketId: socket.id
                    }
                });
                // xóa bản ghi chứ id socket cũ 
                if (checkSocketExistDatabase) {
                    yield prismaDb_1.default.websoket.delete({
                        where: {
                            soketId: socket.id
                        }
                    });
                }
                console.log(`Người dùng thiết bị ${socket.id} ngắt kết nối`);
            }));
        });
        // server is running
        this.server.listen(port, () => {
            console.log(`server is running on port ${port}`);
        });
    }
}
exports.default = new Express();
