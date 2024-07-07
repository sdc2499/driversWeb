import 'dotenv/config'
export class QueryItem {

    loginQuery() {
        const query = 'SELECT id,firstName,lastName,phone,email,userType FROM db.users U, db.passwords P WHERE U.id = P.userId && U.phone=? && P.password=?';
        return query
    }

    getMainDetailesQuery() {
        const query = 'SELECT firstName,lastName,phone,ratingAverage,ratingAmount FROM db.drivers D, db.rating R WHERE D.id = R.driverId';
        return query
    }
    
    upgradeToDriverQuery(questionMarks) {
        return `START TRANSACTION; UPDATE db.users SET userType = 'driver' WHERE ID = ? ;  INSERT INTO db.drivers VALUES (${questionMarks}); COMMIT;`
    }

    changePswdItemQuery(){
        return `UPDATE db.passwords SET password = ? WHERE userId = ? and password=?;`
    }

    postItemQuery(tableName,questionMarks,columns="") {
        const query = `INSERT INTO db.${tableName} ${columns} VALUES( ${questionMarks}) `;
        return query;
    }

    getAllItemQuery(tableName) {
        const query = `SELECT * FROM db.${tableName}`
        return query;
    }
    getByParamQuery(tableName, conditions) {
        const query = `SELECT * FROM db.${tableName} where ${conditions}`
        return query;
    }
    deleteItemQuery(tableName, params) {
        const query = `UPDATE db.${tableName} SET isActive = 0 WHERE ${params} = ?`;
        return query;
    }
    updateItemQuery(tableName, updateDetails, key = "id") {
        const query = `UPDATE db.${tableName} SET ${updateDetails}  WHERE ${key} = ?`;
        return query;
    }

}
