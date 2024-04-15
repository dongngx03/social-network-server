import { Application } from "express";
import Locals from "../providers/Locals";
import CORS from "./CORS";
import Http from "./Http";
import CsrfToken from "./CsrfToken";

class Kernel {
    public static init(_express: Application): Application {
        // nếu cors dc đồng ý thiết lập 
        if (Locals.config().isCORSEnabled) {
            _express = CORS.mount(_express)
        }

        // Mount basic express apis middleware
        _express = Http.mount(_express);

        // Mount csrf token verification middleware
        _express = CsrfToken.mount(_express);

        return _express
    }
}

export default Kernel