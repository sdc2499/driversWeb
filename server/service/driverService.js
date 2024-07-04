import { QueryItem } from "./queryItem.js";
import { query } from "./query.js";
export class DriverService {

    async getDriverById(id) {
        const queryItem = new QueryItem();
        let queryDriver = queryItem.getByParamQuery("drivers", `driverId=?`)
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
            queryTodo = getByParamQuery("drivers", `driverId=?`)
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

    async getMainDetails(driverId) {
        const queryItem = new QueryItem();
        let queryDriver = queryItem.getMainDetailesQuery();
        const result = await query(queryDriver, [driverId])
        return result;
    }

    async postDriver(driver) {
        const queryItem = new QueryItem();
        const { password, ...userWithoutPassword } = driver.user;
        let queryUser = queryItem.postItemQuery("users", "NULL," + "?,".repeat(Object.keys(userWithoutPassword).length) + "?");
        const result = await query(queryUser, [...Object.values(userWithoutPassword), "driver"]);
        const driverId = result.insertId;
        const queryDriver = queryItem.postItemQuery("drivers", "?,".repeat(Object.keys(driver.driver).length + 1) + "?")
        await query(queryDriver, [driverId, ...Object.values(driver.driver), 0]);
        let queryUserPswd = queryItem.postItemQuery("passwords", driverId + ",?");
        await query(queryUserPswd, [driver.user.password]);
        return;
    }

    async upgradeToDriver(driverDetails, id) {
        const queryItem = new QueryItem();
        let queryDriver = queryItem.upgradeToDriverQuery("?,".repeat(Object.keys(driverDetails).length + 2) + "?");
        const result = await query(queryDriver, [id, id, ...Object.values(driverDetails), 0, 0]);
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


    async postRaitingDriver(obj) {
        //לשלוח לפה מזהה נסיעה
        const queryItem = new QueryItem();
        let checkRated = queryItem.getByParamQuery("ride", "id");
        const resultRated = await query(checkRated, [obj.id]);
        if (!resultRated.isRated) {
            let queryUser = queryItem.postItemQuery("ratingDriver", "NULL," + "?,".repeat(Object.keys(obj).length - 2) + "?");
            let query = queryItem.updateItemQuery("rides", "isRated");
            const result = await query(queryUser, Object.values(obj));
            const result1 = await query(query, [1]);
        }
        return;

    }


    // //אם לעשות חישוב בקלינט או בסרבר מה הדירוג
    // async updateDriverRating(body, id) {
    //     const queryItem = new QueryItem();
    //     let stringToQuery = "";
    //     Object.keys(body).forEach(key => { stringToQuery += key += "=?," });
    //     stringToQuery = stringToQuery.slice(0, -1);
    //     let values = Object.values(body);
    //     values.push(id);
    //     const queryDriver = queryItem.updateItemQuery("rating", stringToQuery,"driverId");
    //     const result = await query(queryDriver, values)
    //     return result
    // }

}