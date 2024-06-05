import { NextFunction } from "express";
import IRequest from "../interfaces/vendors/IRequest";
import IResponse from "../interfaces/vendors/IResponse";

class CheckMember {
    public static async isUser(req: IRequest | any, res: IResponse, next: NextFunction) {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: "you 're logged in, please log in"
                })
            }
            // check logic here 
            return next();
        } catch (error: any) {
            return res.status(500).json({
                name: error.name,
                message: error.message
            })
        }
    }
}

export default CheckMember