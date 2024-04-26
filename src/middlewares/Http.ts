import { Application } from "express";
import morgan from "morgan"
import compression from "compression"
import helmet from "helmet";
import express from "express"
import cors from "cors"


class Http {
    public static mount(_express: Application): Application {
        console.log('Booting the HTTP middlware ...');
        // Disable the x-powered-by header in response
        _express.disable('x-powered-by');

        // morgan 
        _express.use(morgan('dev'))

        // compresion
        _express.use(compression())

        //delmet
        _express.use(helmet())

        // express json
        _express.use(express.json())


        return _express
    }
}

export default Http