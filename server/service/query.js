import mysql from 'mysql2/promise';
import 'dotenv/config'

async function query(query, params) {
    let results;
    console.log("in query "+query+"  "+params);   
    const connection=await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: process.env.DB_NAME,
        password: process.env.PASSWORD
    });
    try {
        console.log("in try query"); 
        [results] = await connection.execute(query, params);
        console.log(results+"😋")

    } catch (err) {
        console.log("in catch query " + err);
    }
    finally {
        connection.end();
    }
    return results;
}
export {
    query 
}