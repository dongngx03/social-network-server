"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = __importDefault(require("passport-google-oauth20"));
const Locals_1 = __importDefault(require("./Locals"));
const express_session_1 = __importDefault(require("express-session"));
const prismaDb_1 = __importDefault(require("../configs/prismaDb"));
const GoogleStrategy = passport_google_oauth20_1.default.Strategy;
class Passport {
    init(_express) {
        console.log('Passport :: mouting...');
        _express = _express.use((0, express_session_1.default)({
            secret: Locals_1.default.config().session_secret,
            resave: false,
            saveUninitialized: false
        }));
        _express = _express.use(passport_1.default.initialize());
        _express = _express.use(passport_1.default.session());
        passport_1.default.serializeUser((user, done) => {
            done(null, user);
        });
        passport_1.default.deserializeUser((user, done) => {
            done(null, user);
        });
        passport_1.default.use(new GoogleStrategy({
            clientID: Locals_1.default.config().google_client_id,
            clientSecret: Locals_1.default.config().google_client_secret,
            callbackURL: Locals_1.default.config().callback_url
        }, (accessToken, refreshToken, profile, done) => __awaiter(this, void 0, void 0, function* () {
            console.log(profile);
            const checkUser = yield prismaDb_1.default.user.findUnique({
                where: {
                    idAuth: profile.id
                }
            });
            console.log(checkUser);
            if (checkUser) {
                console.log(`người dùng ${profile.emails[0].value} đăng nhập!`);
            }
            else {
                const newUser = yield prismaDb_1.default.user.create({
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
                    }
                });
                if (newUser) {
                    console.log("tạo tài khoản mới thành công");
                }
                else {
                    console.log('tạo tài khoản mới không thành công');
                }
            }
            return done(null, profile);
        })));
        return _express;
    }
}
exports.default = new Passport;
