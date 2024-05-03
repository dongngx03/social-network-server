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
            async (accessToken, refreshToken, profile: any, done) => {
                console.log(profile);
                const checkUser = await prismaDb.user.findUnique({
                    where: {
                        idAuth: profile.id
                    }
                })

                console.log(checkUser);

                if (checkUser) {
                    console.log(`người dùng ${profile.emails[0].value} đăng nhập!`);
                } else {
                    const newUser = await prismaDb.user.create({
                        data: {
                            idAuth: profile.id,
                            fistname: profile.name.familyName,
                            lastname: profile.name.givenName,
                            phone: "",
                            email: profile.emails[0].value,
                            birtday: new Date(),
                            nickname: `user${profile.id}`,
                            gender: "MALE",
                            avatar: profile.photos[0].value,
                            imagebackground: ""

                        } as any
                    })

                    if (newUser) {
                        console.log("tạo tài khoản mới thành công");

                    } else {
                        console.log('tạo tài khoản mới không thành công');
                        
                    }


                }

                return done(null, profile);
            }
        ));

        return _express
    }
}

export default new Passport