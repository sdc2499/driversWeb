import { QueryItem } from "./queryItem.js";
import { executeQuery } from "./executeQuery.js";
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}

export class DriverService {

    async getDriverById(id) {
        const queryItem = new QueryItem();
        let queryDriver = queryItem.getByParamQuery("drivers", `driverId=?`)
        const result = await executeQuery(queryDriver, [id])
        return result;
    }

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
        const result = await executeQuery(queryDriver, [conditionsValues.toString()])
        return result;
    }

    async getMainDetails(driverId) {
        const queryItem = new QueryItem();
        let queryDriver = queryItem.getMainDetailesQuery();
        const result = await executeQuery(queryDriver, [driverId])
        return result;
    }

    async postDriver(driver) {
        const queryItem = new QueryItem();
        const { password, ...userWithoutPassword } = driver.user;
        let queryUser = queryItem.postItemQuery("users", "NULL," + "?,".repeat(Object.keys(userWithoutPassword).length) + "?");
        const result = await executeQuery(queryUser, [...Object.values(userWithoutPassword), 2]);
        const driverId = result.insertId;
        const queryDriver = queryItem.postItemQuery("drivers", "?,".repeat(Object.keys(driver.driver).length + 1) + "?")
        await executeQuery(queryDriver, [driverId, ...Object.values(driver.driver), 0]);
        let queryUserPswd = queryItem.postItemQuery("passwords", driverId + ",?");
        await executeQuery(queryUserPswd, [driver.user.password]);
        return;
    }

    async upgradeToDriver(driverDetails, id) {
        const queryItem = new QueryItem();
        let queryDriver = queryItem.upgradeToDriverQuery("?,".repeat(Object.keys(driverDetails).length + 2) + "?");
        const result = await executeQuery(queryDriver, [id, id, ...Object.values(driverDetails), 0, 0]);
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
        const result = await executeQuery(queryDriver, values)
        return result
    }

    async postRaitingDriver(tokenFromEmail, rating) {
        const decodedToken = verifyToken(tokenFromEmail);
        const queryItem = new QueryItem();
        const checkRatedQuery = queryItem.getByParamQuery("rides", "id=?");
        const resultRated = await executeQuery(checkRatedQuery, [decodedToken.rideId]);
        if (resultRated && !(resultRated[0].isRated)) {
            const insertRatingQuery = queryItem.postItemQuery("ratingDriver", "NULL," + "?,?,?,?");
            const insertResult = await executeQuery(insertRatingQuery, [decodedToken.driverId, rating.stars, rating.ratingMsg, decodedToken.costumerId]);
            const updateRatedQuery = queryItem.updateItemQuery("rides", "isRated=?");
            const updateResult = await executeQuery(updateRatedQuery, [1, decodedToken.rideId]);
            return { alreadyRated: false }
        }
        else
            return { alreadyRated: true }
    }
    async getDriverRates(driverId) {
        const queryItem = new QueryItem();
    
        // יצירת השאילתה לשליפת הדירוגים של הנהג
        const getRatingsQuery = queryItem.getByParamQuery("ratingdriver", "driverId=?");
    
        try {
            // שליפת הדירוגים מהמסד נתונים
            const result = await executeQuery(getRatingsQuery, [driverId]);
    
            // החזרת התוצאה
            return result;
        } catch (error) {
            console.error("Error fetching driver ratings:", error);
            throw new Error("Failed to fetch driver ratings");
        }
    }
    
}