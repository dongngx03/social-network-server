import { Application } from "express";
import router from "../routes";

class Routes {
    public mountWeb(_express: Application): Application {
        console.log('Routes :: Mounting Web Routes...');

        _express.use('/', router)

        return _express

    }
}

export default new Routes