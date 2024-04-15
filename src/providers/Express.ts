import express from "express"
import Locals from "./Locals";
import Kernel from "../middlewares/Kernel";
import Routes from "./Routes";

class Express {
    public express: express.Application

    /**
     * contructor
     */
    constructor() {
        this.express = express();

        this.mountMiddleware()
        this.mountRouter()

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
     * run server
     */
    public init(): any {
        const port: number = Locals.config().port;


        this.express.listen(port, () => {
            console.log(`server is running on port ${port}`);
        })
    }

}

export default new Express()