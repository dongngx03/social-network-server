import cors from "cors"
import { Application } from "express"
import Locals from "../providers/Locals";

class CORS {
    public mount(_express: Application): Application {
        console.log('start the CORS middlware... ');

        const options = {
            origin: Locals.config().url_client,
            optionsSuccessStatus: 200,
            credentials: true
        }

        _express.use(cors(options))


        return _express
    }
}

export default new CORS