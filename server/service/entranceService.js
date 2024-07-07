import { QueryItem } from "./queryItem.js";
import { executeQuery } from "./executeQuery.js";
import { sha256 } from 'js-sha256';
import jwt from 'jsonwebtoken';

export class UserService {

    async login(user) {
        const queryItem = new QueryItem();
        user.password = sha256(user.password)
        let queryUser = queryItem.loginQuery()
        const result = await executeQuery(queryUser, Object.values(user));
        console.log("hi " + result[0].id)
        const userT = {
            id: result[0].id,
            phone: user.phone
        }
        const token = jwt.sign(userT, process.env.JWT_SECRET, {
            expiresIn: '1h',
        }); 
           console.log("hi " + token)
        return { result: result[0], token: token };
    }

    async register(user) {
        const queryItem = new QueryItem();
        let pswd = sha256(user.password);
        let queryUser = queryItem.postItemQuery("users", "NULL," + "?,".repeat(Object.keys(user).length - 1) + "?");
        const { password, ...userWithoutPassword } = user;
        const result = await executeQuery(queryUser, [...Object.values(userWithoutPassword),1]);
        let queryUserPswd = queryItem.postItemQuery("passwords", "?,?,?");
        await executeQuery(queryUserPswd, [result.insertId, pswd,0]);
        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        console.log( result.insertId)
        console.log("t   "+ token)
        return { userId: result.insertId, token: token };
    }
}

