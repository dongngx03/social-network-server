import { Application } from "express";
import passport, { use } from "passport";
import googleOauth20 from "passport-google-oauth20"
import Locals from "./Locals";
import session from "express-session";
import prismaDb from "../configs/prismaDb";


const GoogleStrategy = googleOauth20.Strategy

class Passport {
    public init(_express: Application): Application {
        console.log('Passport :: mouting...');

        _express = _express.use(session({
            secret: Locals.config().session_secret,
            resave: false,
            saveUninitialized: false
        }))
        _express = _express.use(passport.initialize());
        _express = _express.use(passport.session());

        passport.serializeUser((user: any, done) => {
            done(null, user);
        });
        passport.deserializeUser((user: any, done) => {
            done(null, user);
        })
        passport.use(new GoogleStrategy({
            clientID: Locals.config().google_client_id,
            clientSecret: Locals.config().google_client_secret,
            callbackURL: Locals.config().callback_url
        },
            async (accessToken, refreshToken, profile, done) => {
                
                return done(null, profile);
            }
        ));

        return _express
    }
}

export default new Passport