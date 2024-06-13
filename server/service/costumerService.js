import { QueryItem } from "./queryItem.js";
import { query } from "./query.js";
export class CostumerService {
    async getUserByParam(req) {
        const queryItem = new QueryItem();
        let queryUser, conditionsParams = [], conditionsValues = [];
        let queryParames = req.query;
        if (req.params.id) {
            conditionsValues = req.params.id;
            queryTodo = getByParamQuery("users", `id=?`)
        }
        else {
            if (Object.entries(queryParames).length === 0)
                queryUser = queryItem.getAllItemQuery("users")
            else {
                Object.keys(queryParames).map((key) => {
                    conditionsParams.push(`${key} = ?`)
                    conditionsValues.push(queryParames[key])
                })
                queryUser = queryItem.getByParamQuery("users", conditionsParams.join(" AND "))
            }
        }
        const result = await query(queryUser, [conditionsValues.toString()])
        return result;
    }
    
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