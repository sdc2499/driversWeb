import { RideService } from '../service/rideService.js';

export default class RideController {

    async waitingForPrice(req, res, next) {
        try {
            const rideService = new RideService();
            const result = await rideService.getWaitingForPrice();
            console.log(result + result[0])
            return res.json({ data: result, status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }

    async waitingForDriver(req, res, next) {
        try {
            const rideService = new RideService();
            const result = await rideService.getWaitingForDriver();
            console.log(result + result[0])
            return res.json({ data: result, status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }

    async acceptedRequests(req, res, next) {
        try {
            const rideService = new RideService();
            const result = await rideService.getAcceptedRequests(req.params.id);
            console.log(result + result[0])
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