import { QueryItem } from "./queryItem.js";
import { query } from "./query.js";

export class RideService {
    async getWaitingForPrice() {
        const queryItem = new QueryItem();
        let queryPrice = queryItem.getByParamQuery("rides", `status=?`)
        const result = await query(queryPrice, [1])
        return result;
    }
    async getWaitingForDriver() {
        const queryItem = new QueryItem();
        let queryPrice = queryItem.getByParamQuery("rides", `status=?`)
        const result = await query(queryPrice, [2])
        return result;
    }  
    
    async getAcceptedRequests(id) {
        const queryItem = new QueryItem();
        let queryPrice = queryItem.getByParamQuery("rides", `driverId=?`)
        const result = await query(queryPrice, [id])
        return result;
    }
}