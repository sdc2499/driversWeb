import { QueryItem } from "./queryItem.js";
import { query } from "./query.js";
import { sha256 } from 'js-sha256';
import jwt from 'jsonwebtoken';

export class UserService {

    async login(user) {
        const queryItem = new QueryItem();
        user.password = sha256(user.password)
        let queryUser = queryItem.loginQuery()
        const result = await query(queryUser, Object.values(user));
        // console.log("res"+result)
        // console.log("res0"+result[0])
        // console.log("resname"+result[0].firstName)   

        const token = jwt.sign(result[0], process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return {result:result[0],token:token};
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
        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return { userId: result.insertId, token: token };
    }
}

