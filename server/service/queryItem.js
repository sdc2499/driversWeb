import 'dotenv/config'
//לשנות לכלס
function loginQuery(){
    const query ='SELECT firstName,lastName,phone,email FROM db.costumers C, db.passwords P WHERE C.id = P.costumerId && C.phone=? && P.password=?'; 
    return query
}

function postItemQuery(tableName, questionMarks) {
    const query = `INSERT INTO db.${tableName} VALUES( ${questionMarks}) `;
    return query;
}

export{
    loginQuery,
    postItemQuery
}
