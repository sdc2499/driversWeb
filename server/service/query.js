import mysql from 'mysql2/promise'
import 'dotenv/config'

async function query(query, params) {
    let results;
    console.log("in query " + query + "  " + params);
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: process.env.DB_NAME,
        password: process.env.PASSWORD
    });
    try {
        console.log("in try query");

        [results] = await connection.execute(query, params);

        console.log(results + "😋")

    } catch (err) {
        console.log("in catch query " + err);
    }
    finally {
        connection.end();
    }
    return results;
}

async function transactionQuery(query1, query2) {

    const connection = await pool.getConnection()

    try {
        await connection.beginTransaction()

        await connection.query(query1)

        await connection.query(query2)
        /* etcetera etcetera */
        await connection.commit()
    }
    catch (error) {
        await connection.rollback()
        pool.releaseConnection()
        res.status(400).send({ something })
    }
    pool.releaseConnection()

}

export {
    query
}