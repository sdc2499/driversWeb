import { QueryItem } from "./queryItem.js";
import { query } from "./query.js";
import { sha256 } from 'js-sha256';
export class UserService {

    async login(user) {
        const queryItem=new QueryItem();
        user.password=sha256(user.password)
        let queryUser = queryItem.loginQuery()
        const result = await query(queryUser, Object.values(user));
        return result;
    }
    async register(user) {
        const queryItem=new QueryItem();

        //אם הצליח להכניס משתמש ונפל כשהכניס סיסמא מה קורה?
        user[2].password=sha256(user[2].password);

        let queryUser = queryItem.postItemQuery("costumers", "NULL," + "?,".repeat(Object.keys(user[0]).length - 1) + "?");
        const result = await query(queryUser, Object.values(user[0]));
        const userId = result.insertId;
        let queryUserAddress = queryItem.postItemQuery("addresses", userId +","+ "?,".repeat(Object.keys(user[1]).length - 1) + "?");
        await query(queryUserAddress, Object.values(user[1]));
        let queryUserPswd = queryItem.postItemQuery("passwords", userId+ ",?");
        await query(queryUserPswd, Object.values(user[2]));
       return;
    }
}

