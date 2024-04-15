import { Application } from "express";
import lusca from "lusca"

class CsrfToken {
    public static mount(_express: any): Application {
        console.log('Booting CsrfToken middlware ...');
        _express.set('trust proxy', 1);

        // Enables x-frame-options headers
        _express.use(lusca.xframe('SAMEORIGIN'));

        // Enables xss-protection headers
        _express.use(lusca.xssProtection(true));
        
        return _express
    }
}

export default CsrfToken