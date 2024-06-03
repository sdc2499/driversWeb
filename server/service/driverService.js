import { QueryItem } from "./queryItem.js";
import { query } from "./query.js";
export class DriverService {

    async getDriverById(id) {
        const queryItem = new QueryItem();
        let queryDriver = queryItem.getByParamQuery("drivers", `id=?`)
        const result = await query(queryDriver, [id])
        return result;
    }

//לבדוק למה לא עובד עם כמה משתנים
    async getDrivers(req) {
        const queryItem = new QueryItem();
        let queryDriver, conditionsParams = [], conditionsValues = [];
        let queryParames = req.query;
        if (req.params.id) {
            conditionsValues = req.params.id;
            queryTodo = getByParamQuery("drivers", `id=?`)
        }
        else {
            if (Object.entries(queryParames).length === 0)
                queryDriver = queryItem.getAllItemQuery("drivers")
            else {
                Object.keys(queryParames).map((key) => {
                    conditionsParams.push(`${key} = ?`)
                    conditionsValues.push(queryParames[key])
                })
                queryDriver = queryItem.getByParamQuery("drivers", conditionsParams.join(" AND "))
            }
        }
        const result = await query(queryDriver, [conditionsValues.toString()])
        return result;
    }

    async postDriver(driver) {
        const queryItem = new QueryItem();
        let queryDriver = queryItem.postItemQuery("drivers", "NULL," + "?,".repeat(Object.keys(driver).length - 1) + "?");
        const result = await query(queryDriver, Object.values(driver));
        return;
    }

    async updateDriver(body, id) {
        const queryItem = new QueryItem();
        let stringToQuery = "";
        Object.keys(body).forEach(key => { (key != "id") && (stringToQuery += key += "=?,") });
        stringToQuery = stringToQuery.slice(0, -1);
        let values = Object.values(body);
        values.push(id);
        const queryDriver = queryItem.updateItemQuery("drivers", stringToQuery);
        const result = await query(queryDriver, values)
        return result
    }
    
}