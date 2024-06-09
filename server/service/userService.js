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
        let pswd = sha256(user.password);
        let queryUser = queryItem.postItemQuery("users", "NULL," + "?,".repeat(Object.keys(user).length - 1) + "?");
        const { password, ...userWithoutPassword } = user;
        const result = await query(queryUser, [...Object.values(userWithoutPassword), "costumer"]);
        let queryUserPswd = queryItem.postItemQuery("passwords", result.insertId + ",?");
        await query(queryUserPswd, [pswd]);
        return result.insertI;
    }
}

