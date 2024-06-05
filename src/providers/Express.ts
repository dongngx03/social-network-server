import express from "express"
import Locals from "./Locals";
import Kernel from "../middlewares/Kernel";
import Routes from "./Routes";
import Passport from "./Passport";
import { Server } from "socket.io";
import http from 'http'
import prismaDb from "../configs/prismaDb";

class Express {
    public express: express.Application
    public server: any
    public io: any

    /**
     * contructor
     */
    constructor() {
        this.express = express();

        this.mountMiddleware()

        this.mountPassport()

        this.mountRouter()

        this.createWS()

    }

    /**
     * middleware
     */
    private mountMiddleware(): void {
        this.express = Kernel.init(this.express)
    }

    /**
     * Router
     */
    private mountRouter(): void {
        this.express = Routes.mountWeb(this.express)
    }

    /**
     * passport 
     */
    private mountPassport(): void {
        this.express = Passport.init(this.express)
    }

    public createWS(): void {
        this.server = http.createServer(this.express)
        this.io = new Server(this.server, {
            path: "/socket.io",
            cors: {
                origin: Locals.config().url_client
            }
        })

        console.log('create ws success!');

    }


    /**
     * run server
     */
    public init(): any {
        const port: number = Locals.config().port;

        // websoket
        this.io.on("connection", (socket: any) => {
            // thêm địa chỉ người dùng vào db
            console.log('Có người nào đấy đang vào trang web bằng thiết bị id: ', socket.id);

            let CheckSoketId: string | null = null

            // người dùng login bằng google
            socket.on('userinfor', async (data: any) => {
                console.log(data);

                // lưu vào db id socket
                if (CheckSoketId === socket.id) {
                    // kiểm tra nếu như vẫn là id cũ thì bỏ qua
                    console.log(`ID Người dùng${data.name} đã được lưu vào database`);
                } else {
                    // lưu 
                    await prismaDb.websoket.create({
                        data: {
                            userId: data.userId,
                            soketId: socket.id
                        }
                    })
                    console.log(`Người dùng tên : ${data.name} đã đăng nhập bằng thiết bị id:  ${socket.id}`);
                    CheckSoketId = socket.id
                }

            })

            // người dùng follow người khác sẽ gửi thông báo đến người đấy
            socket.on('following', async (data: any) => {
                // comming soon
            })

            // người dùng nhắn gửi tin nhắn 
            socket.on('send-message', async (data: any) => {
                // comming soon
            })

            // người dùng thích bài viết của người khác 
            socket.on('like-post', async (data: any) => {
                // coming soon
            })

            // người dùng bình luận bài viết người khác 
            socket.on('comment-post', async (data: any) => {

            })
            // người dùng đăng xuất
            socket.on('log-out', async () => {
                CheckSoketId = null
                // check
                const checkSocketExistDatabase = await prismaDb.websoket.findUnique({
                    where: {
                        soketId: socket.id
                    }
                })
                // xóa bản ghi chứ id socket cũ 
                if (checkSocketExistDatabase) {
                    await prismaDb.websoket.delete({
                        where: {
                            soketId: socket.id
                        }
                    })
                }
                console.log(`Người dùng thiết bị ${socket.id} đăng xuất `);
            })
            // người dùng ngắt kết nối 
            socket.on('disconnect', async () => {
                CheckSoketId = null
                // check
                const checkSocketExistDatabase = await prismaDb.websoket.findUnique({
                    where: {
                        soketId: socket.id
                    }
                })
                // xóa bản ghi chứ id socket cũ 
                if (checkSocketExistDatabase) {
                    await prismaDb.websoket.delete({
                        where: {
                            soketId: socket.id
                        }
                    })
                }
                console.log(`Người dùng thiết bị ${socket.id} ngắt kết nối`);
            })
        })

        // server is running
        this.server.listen(port, () => {
            console.log(`server is running on port ${port}`);
        })
    }


}

export default new Express()