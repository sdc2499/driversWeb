import { QueryItem } from "./queryItem.js";
import { query } from "./query.js";
export class RideService {
    
    async booking(user) {
        user.password = sha256(user.password)
        let queryUser = QueryItem.loginQuery()
        const result = await query(queryUser, Object.values(user));
        return result;
    }
}