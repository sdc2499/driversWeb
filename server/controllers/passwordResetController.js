import { PasswordResetService } from "../service/passwordResetService";


export default class PasswordResetController {



    async passwordUpdate(req, res, next) {
        try {
            const passwordResetService = new PasswordResetService();
            const result = await passwordResetService.passwordUpdate();
            return res.json({ data: result, status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }

    

    async passwordReset(req, res, next) {
        try {
            const passwordResetService = new PasswordResetService();
            const result = await passwordResetService.passwordReset();
            return res.json({ data: result, status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }














}