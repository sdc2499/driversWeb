import { QueryItem } from "./queryItem.js";
import { query } from "./query.js";

export class RideService {
    async getWaitingForPrice() {
        const queryItem = new QueryItem();
        let queryPrice = queryItem.getByParamQuery("rides", `status=?`)
        const result = await query(queryPrice, ["request_opened"])
        return result;
    }
    async getWaitingForDriver() {
        const queryItem = new QueryItem();
        let queryPrice = queryItem.getByParamQuery("rides", `status=?`)
        const result = await query(queryPrice, ["price_updated"])
        return result;
    }
    // async booking(user) {
    //     user.password = sha256(user.password)
    //     let queryUser = QueryItem.loginQuery()
    //     const result = await query(queryUser, Object.values(user));
    //     return result;
    // }
}