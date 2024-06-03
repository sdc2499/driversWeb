import { CostumerService } from "../service/costumerService.js";
export default class CostumerController {
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