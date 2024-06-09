import { UserService } from '../service/userService.js';
import jwt from 'jsonwebtoken';
import 'dotenv/config'

export default class EntranceController {
    async login(req, res, next) {
        try {
            const userService = new UserService();
            const result = await userService.login(req.body);
            if (result[0] == undefined) {
                throw new Error("No elements found");
            }
            // const authorizedUser = {
            //     userId: resultUsers[0].userId,
            //     name: resultUsers[0].name,
            //     username: resultUsers[0].username,
            //     email: resultUsers[0].email,
            //     phone: resultUsers[0].phone,
            // };
            const token = jwt.sign(result, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            // return res.status(200).json({ data: authorizedUser, token: { token }, status: 200 });
            return res.status(200).json({ data: result,token: { token }, status: 200 });
        } catch (ex) {
            const err = {};
            switch (ex.message) {
                case "No elements found":
                    err.statusCode = 404;
                    break;
                default:
                    err.statusCode = 500;
                    break;
            }
            err.message = ex.message;
            next(err);
        }
    }


    //לבדוק בטוח אם הסרביס צריך לקרוא לכל הטבלאות 
    //מתי להצפין פה או בסרביס
    async register(req, res, next) {
        try {
            const userService = new UserService();
            const result =await userService.register(req.body);
            // const token = jwt.sign(result ,process.env.JWT_SECRET, {
            //     expiresIn: '1h',
            // });
            return res.status(200).json({id:result, status: 200 });
            // return res.status(200).json({id:result,token: { token }, status: 200 });
        } catch (ex) {
            const err = {};
            switch (ex.message) {
                default:
                    err.statusCode = 500;
                    break;
            }
            err.message = ex.message;
            next(err);
        }
    }
}