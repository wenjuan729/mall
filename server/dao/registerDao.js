var dbutil = require("./dbutil");

//写入注册信息
function insertRegister(username,password,age,gender,describe,ctime,success) {
    var insertSql = "insert into login (`user_name`,`password`,`age`,`gender`,`describe`,`ctime`) values (?,?,?,?,?,?);";
    var params = [username,password,age,gender,describe,ctime];
    console.log (params)

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function(error,result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error); 
        }
    });
    connection.end();
}

//根据用户名查找信息
function queryLoginByUsername(username,success) {
    var querySql = "select * from login where user_name = ?;";
    var connection = dbutil.createConnection();

    connection.connect();
    connection.query(querySql,username,function(error,result) {
        if (error == null) {
            console.log(result);
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

module.exports.insertRegister = insertRegister;
module.exports.queryLoginByUsername = queryLoginByUsername;