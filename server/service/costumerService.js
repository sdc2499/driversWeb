import { QueryItem } from "./queryItem.js";
import { query } from "./query.js";
export class CostumerService {
    async updateCostumer(body, id) {
        const queryItem = new QueryItem();
        let stringToQuery = "";
        Object.keys(body).forEach(key => { (key != "id") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(body);
        values.push(id);
        const queryCostumer = queryItem.updateItemQuery("users", stringToQuery);
        const result = await query(queryCostumer, values)
        return result
    }
}