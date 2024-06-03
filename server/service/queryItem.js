import 'dotenv/config'
export class QueryItem {
    
    loginQuery() {
        const query = 'SELECT firstName,lastName,phone,email FROM db.costumers C, db.passwords P WHERE C.id = P.costumerId && C.phone=? && P.password=?';
        return query
    }

    postItemQuery(tableName, questionMarks) {
        const query = `INSERT INTO db.${tableName} VALUES( ${questionMarks}) `;
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
    //לשאול את המורה אם לעשות ןסאקטיב או דליט
    deleteItemQuery(tableName, params) {
        const query = `UPDATE db.${tableName} SET isActive = 0 WHERE ${params} = ?`;
        return query;
    }

    updateItemQuery(tableName, updateDetails) {
        const query = `UPDATE db.${tableName} SET ${updateDetails}  WHERE id = ?`;
        return query;
    }

}
