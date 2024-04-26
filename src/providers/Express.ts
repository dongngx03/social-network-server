import express from "express"
import Locals from "./Locals";
import Kernel from "../middlewares/Kernel";
import Routes from "./Routes";
import Passport from "./Passport";

class Express {
    public express: express.Application

    /**
     * contructor
     */
    constructor() {
        this.express = express();
        
        this.mountMiddleware()

        this.mountPassport()

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
     * passport 
     */
    private mountPassport(): void {
        this.express = Passport.init(this.express)
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