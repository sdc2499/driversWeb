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
     async upgradeToDriver(driverDetails, id) {
        
        

        console.log("id service: "+id)
        const queryItem = new QueryItem();
        let queryUser=queryItem.updateItemQuery("users","userType=?")
        let queryDriver = queryItem.postItemQuery("drivers","?,".repeat(Object.keys(driverDetails).length+2 ) + "?")
        console.log("values::: "+[...Object.values(driverDetails)])
        await query(queryUser,["driver",id])
        const result = await query(queryDriver, [ id, ...Object.values(driverDetails), 0, 0]);
        return;
    }
    async updateCostumer(body, id) {

        const queryItem = new QueryItem();
        let stringToQuery = "";
        Object.keys(body).forEach(key => { (key != "id") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        console.log("😍😍😍"+body+body[0]+body.firstName)

        let values = Object.values(body);
        values.push(id);
        const queryCostumer = queryItem.updateItemQuery("users", stringToQuery);
        console.log("😍"+queryCostumer)

        const result = await query(queryCostumer, values)
        console.log("😍😍"+result)

        return result
    }
}