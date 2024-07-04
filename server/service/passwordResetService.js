import { QueryItem } from "./queryItem.js";
import { query } from "./query.js";

export class PasswordResetService {

    async passwordReset(phone) {
        const queryItem = new QueryItem();
        const result = await query("SELECT email FROM db.users where phone=?;", [phone]);
        console.log(result[0].email)


        
        return;
    }

    async passwordUpdate() {
        const queryItem = new QueryItem();
        // let queryDriver = queryItem.upgradeToDriverQuery("?,".repeat(Object.keys(driverDetails).length + 2) + "?");
        // const result = await query(queryDriver, [id, id, ...Object.values(driverDetails), 0, 0]);
        return;
    }

}