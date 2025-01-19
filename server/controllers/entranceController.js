import { UserService } from '../service/entranceService.js';
import 'dotenv/config'

export default class EntranceController {

    async login(req, res, next) {
        try {
            console.log("req:::"+req)
            const userService = new UserService();
            const result = await userService.login(req.body);
            if (result.result == undefined)
                throw new Error("No elements found");

            return res.json({ data: result.result, token: result.token, status: 200 });
        } catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err);
        }
    }

    async register(req, res, next) {
        try {
            const userService = new UserService();
            const result = await userService.register(req.body);
            console.log( result.userId)

            return res.status(200).json({ id: result.userId, token: result.token, status: 200 });
        }
        catch (ex) {
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