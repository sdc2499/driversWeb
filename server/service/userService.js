import { QueryItem } from "./queryItem.js";
import { query } from "./query.js";
import { sha256 } from 'js-sha256';
export class UserService {

    async login(user) {
        const queryItem = new QueryItem();
        user.password = sha256(user.password)
        let queryUser = queryItem.loginQuery()
        const result = await query(queryUser, Object.values(user));
        return result;
    }

    //לעשות בסקל שבטיפ יהיה 3 סוגים
    async register(user) {
        const queryItem = new QueryItem();
        //אם הצליח להכניס משתמש ונפל כשהכניס סיסמא מה קורה?
        user[1].password = sha256(user[1].password);
        let queryUser = queryItem.postItemQuery("users", "NULL," + "?,".repeat(Object.keys(user[0]).length) + "?");
        const result = await query(queryUser, [Object.values(user[0]), "costumer"]);
        const userId = result.insertId;
        let queryUserPswd = queryItem.postItemQuery("passwords", userId + ",?");
        await query(queryUserPswd, Object.values(user[1]));
        return userId;
    }
}

