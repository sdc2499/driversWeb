// import mysql from 'mysql2/promise'
// import 'dotenv/config'

// async function query(query, params) {
//     let results;
//     console.log("in query " + query + "  " + params);
//     const connection = await mysql.createConnection({
//         host: 'localhost',
//         user: 'root',
//         database: process.env.DB_NAME,
//         password: process.env.PASSWORD
//     });
//     try {
//         console.log("in try query");

//         [results] = await connection.execute(query, params);

//         console.log(results + "😋")

//     } catch (err) {
//         console.log("in catch query " + err);
//     }
//     finally {
//         connection.end();
//     }
//     return results;
// }


//לשאול אם הסוקט טוב 
//מה צריך לשמור בטוקן
//איך לעשות משתמש אורח
//איך לנווט נכון בבית
//איזה נתונים לשמור בלוקלסטורג
//למה הקורי לא ועבד
//איך לבדוק מרחקים אם אפשר באמצעות גפיטי
//המייל של הנהג
//איךלהבטיח את


//אוףףף לשאול מה לעשות עם כל הפרויקט הסתוםםםםם


import mysql from 'mysql2/promise';
import 'dotenv/config';

async function query(queries) {

    let results = [];

    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        database: process.env.DB_NAME,
        password: process.env.PASSWORD,
    });

    try {
        await connection.beginTransaction();

        for (let i = 0; i < queries.length; i++) {
            console.log("😂z " + results[0])

            let { query, params } = queries[i];
            console.log(`Executing query ${i + 1}: ${query} with params ${params}`);
            if (typeof params === 'function') {
                console.log("hi param")
                console.log(".." + params)
                console.log("results[i - 1]+++" + results[0].insertId)
                params = params(results[i - 1]);
                console.log(".." + params)
            }
            console.log("p  " + params)
            const [result] = await connection.execute(query, params);
            console.log(`Result of query ${i + 1}:`, result);
            //   console.log(result[0].firstName)
            results.push(result[0]);
            //   console.log(results[i].firstName)

        }


        // אם כל השאילתות הצליחו, מבצעים קומיט
        await connection.commit();
        console.log('All queries executed successfully, transaction committed.');

    } catch (err) {
        // אם יש שגיאה, מבצעים רולבק
        await connection.rollback();
        console.error('Error occurred, transaction rolled back:', err);
    } finally {
        connection.end();
    }
    return results;
}



// async function transactionQuery(query1, query2) {

//     const connection = await pool.getConnection()

//     try {
//         await connection.beginTransaction()

//         await connection.query(query1)

//         await connection.query(query2)
//         /* etcetera etcetera */
//         await connection.commit()
//     }
//     catch (error) {
//         await connection.rollback()
//         pool.releaseConnection()
//         res.status(400).send({ something })
//     }
//     pool.releaseConnection()

// }

export {
    query
}