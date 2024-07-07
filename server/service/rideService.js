import { QueryItem } from "./queryItem.js";
import { executeQuery } from "./executeQuery.js";

export class RideService {

    async getWaitingForPrice() {
        const queryItem = new QueryItem();
        let queryPrice = queryItem.getByParamQuery("rides", `status=?`)
        const result = await executeQuery(queryPrice, [1])
        return result;
    }
    
    async getWaitingForDriver() {
        const queryItem = new QueryItem();
        let queryPrice = queryItem.getByParamQuery("rides", `status=?`)
        const result = await executeQuery(queryPrice, [2])
        return result;
    }  
    
    async getAcceptedRequests(id) {
        const queryItem = new QueryItem();
        let queryPrice = queryItem.getByParamQuery("rides", `driverId=?`)
        const result = await executeQuery(queryPrice, [id])
        return result;
    }
}