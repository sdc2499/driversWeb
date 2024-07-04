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
        // const result = await query([{ query: queryUser, params: Object.values(user) }]);
        console.log("hi " + result[0].id)
        { result[0].id && console.log("111") }
        const userT = {
            id: result[0].id,
            phone: user.phone
        }
        const token = jwt.sign(userT, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return { result: result[0], token: token };
    }

    //לעשות בסקל שבטיפ יהיה 3 סוגים
    async register(user) {
        const queryItem = new QueryItem();
        let pswd = sha256(user.password);
        let queryUser = queryItem.postItemQuery("users", "NULL," + "?,".repeat(Object.keys(user).length - 1) + "?");
        const { password, ...userWithoutPassword } = user;
        const result = await query(queryUser, [...Object.values(userWithoutPassword),1]);
        let queryUserPswd = queryItem.postItemQuery("passwords", "?,?");
        await query(queryUserPswd, [result.insertId, pswd]);
        //  const result = await query([
        //     { query: queryUser, params: [...Object.values(userWithoutPassword), "costumer"] },
        //     { query: queryUserPswd, params: (previousResult) => {
        //         console.log('Previous result:', previousResult);
        //         return [previousResult.insertId, pswd];
        //     }}
        // ]);
        const token = jwt.sign(user, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        return { userId: result.insertId, token: token };
    }
}

