import { QueryItem } from "./queryItem.js";
import { executeQuery } from "./executeQuery.js";
import { sha256 } from 'js-sha256';

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
        const result = await executeQuery(queryUser, [conditionsValues.toString()])
        return result;
    }

    async upgradeToDriver(driverDetails, id) {
        console.log("id service: " + id)
        const queryItem = new QueryItem();
        let queryUser = queryItem.updateItemQuery("users", "userType=?")
        let queryDriver = queryItem.postItemQuery("drivers", "?,".repeat(Object.keys(driverDetails).length + 2) + "?")
        console.log("values::: " + [...Object.values(driverDetails)])
        await executeQuery(queryUser, [2, id])
        const result = await executeQuery(queryDriver, [id, ...Object.values(driverDetails), 0, 0]);
        return;
    }

    async updateCostumer(body, id) {
        console.log("body in update:::" + body)
        const queryItem = new QueryItem();
        let stringToQuery = "";
        Object.keys(body).forEach(key => { (key != "id") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(body);
        values.push(id);
        const queryCostumer = queryItem.updateItemQuery("users", stringToQuery);
        const result = await executeQuery(queryCostumer, values)
        return result
    }

    async changePswd(body, id) {
        console.log("body in update:::" + body)
        const queryItem = new QueryItem();
        const queryCostumer = queryItem.changePswdItemQuery();
        let curPswd = sha256(body.currentPassword)
        let newPswd = sha256(body.newPassword)
        const result = await executeQuery(queryCostumer, [newPswd, id, curPswd])
    }
}