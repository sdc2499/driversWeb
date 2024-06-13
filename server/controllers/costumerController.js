import { CostumerService } from "../service/costumerService.js";
export default class CostumerController {
    async getUserByParam(req, res, next){
        try {
            const costumerService = new CostumerService();
            const result = await costumerService.getUserByParam(req);
            console.log(result+result[0].id)
            return res.status(200).json({ data: result[0], status: 200 });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }
    async upgradeToDriver(req, res, next){
        try {
            const costumerService = new CostumerService();
            console.log("in costumer controler:::"+req.body+req.body.gender+req.params.id)
            await costumerService.upgradeToDriver(req.body, req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;  
            err.message = ex.message;
            next(err)
        }
    }
    async updateCostumer(req, res, next) {
        try {
            const costumerService = new CostumerService();
            await costumerService.updateCostumer(req.body, req.params.id);
            return res.status(200).json({ status: 200, data: req.params.id });
        }
        catch (ex) {
            const err = {}
            err.statusCode = 500;
            err.message = ex.message;
            next(err)
        }
    }
}