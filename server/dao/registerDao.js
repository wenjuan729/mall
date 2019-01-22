var dbutil = require("./dbutil");

function insertRegister(username,password,age,gender,describe,ctime,success) {
    var insertSql = "insert into login (`user_name`,`password`,`age`,`gender`,`describe`,`ctime`) values (?,?,?,?,?,?);";
    var params = [username,password,age,gender,describe,ctime];
    console.log (params)

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function(error,result) {
        if (error == null) {
            console.log(result)
            success(result);
        } else {
            throw new Error(error); 
        }
    });
    connection.end();
}

module.exports.insertRegister = insertRegister;