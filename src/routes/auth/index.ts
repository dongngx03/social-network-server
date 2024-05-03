import { Router } from "express";
import passport from "passport";
import Locals from "../../providers/Locals";
import GoogleController from "../../controllers/auth/google.controller";
import prismaDb from "../../configs/prismaDb";


const routerAuth = Router();

routerAuth.get('/login/failed', GoogleController.loginFailed as any)

routerAuth.get('/login/success', GoogleController.loginSuccess as any);

routerAuth.get('/logout', GoogleController.logout as any)

routerAuth.get('/google', passport.authenticate("google", { scope: ["profile", "email"] }))

routerAuth.get('/google/callback', passport.authenticate("google", {
    successRedirect: Locals.config().url_client,
    failureRedirect: "/v1/api/auth/login/failed"
}))

// test router
routerAuth.get('/user', async (req, res) => {
    const user = await prismaDb.user.findMany();
    return res.status(200).json({
        success : true,
        user: user
    })
})



export default routerAuth