import { DriverService } from "../service/driverService.js";

export default class DriverController {

    async getDrivers(req, res, next) {

        try {
            const driverService = new DriverService();
            const result = await driverService.getDrivers(req);
            return res.json({ data: result, status: 200 });
        }  

        catch (ex) {
            const err = {};
            switch (ex.message) {
                //לבדוק אם אין נהגים לזרוק שגיאה או פשוט אין מחזיר מערך ריק?
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

    async rating(req, res, next) {
        const { stars, ratingMsg } = req.body;
console.log(stars)
console.log(ratingMsg)
        try {
            const driveService = new DriverService();
            await driveService.postRaitingDriver(req.query.token,req.body);
            return res.json({ status: 200 });
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


    async getDriverById(req, res, next) {
        try {
            const driverService = new DriverService();
            const result = await driverService.getDriverById(req.params.id);
            return res.json({ data: result, status: 200 });
        }         
        catch (ex) {
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


    async getMainDetails(req, res, next) {
        try {
            const driverService = new DriverService();
            const result = await driverService.getMainDetails(req.params.id);
            return res.json({ data: result, status: 200 });
        }         
        catch (ex) {
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


    async addDriver(req,res,next){
        try {
            const driveService = new DriverService();
            await driveService.postDriver(req.body);
            return res.json({ status: 200 });
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



    async updateDriverById(req, res,next) {
        try {
            console.log(req.body.firstName+"    "+ req.params.id)
            const driverService = new DriverService();
            await driverService.updateDriver(req.body, req.params.id);
            return res.json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }

    async updateDriverRating(req, res,next) {
        try {
            const driverService = new DriverService();
            await driverService.postRaitingDriver(req.params.token);
            return res.json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }

}