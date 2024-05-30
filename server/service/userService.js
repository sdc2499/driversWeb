import { loginQuery, postItemQuery } from "./queryItem.js";
import { query } from "./query.js";
import { sha256 } from 'js-sha256';
export class UserService {

    async login(user) {
        user.password=sha256(user.password)
        let queryUser = loginQuery()
        const result = await query(queryUser, Object.values(user));
        return result;
    }
    async register(user) {
        //אם הצליח להכניס משתמש ונפל כשהכניס סיסמא מה קורה?
        user[2].password=sha256(user[2].password);

        let queryUser = postItemQuery("costumers", "NULL," + "?,".repeat(Object.keys(user[0]).length - 1) + "?");
        const result = await query(queryUser, Object.values(user[0]));
        const userId = result.insertId;
        let queryUserAddress = postItemQuery("addresses", userId +","+ "?,".repeat(Object.keys(user[1]).length - 1) + "?");
        await query(queryUserAddress, Object.values(user[1]));
        let queryUserPswd = postItemQuery("passwords", userId+ ",?");
        await query(queryUserPswd, Object.values(user[2]));
        return;
    }
}

