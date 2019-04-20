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
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}
//根据用户ID修改个人信息
function updatePersonalList (age,gender,describe,ctime,id,success) {
    var uploadSql = "update login set `age`= ?,`gender`= ?,`describe`= ?,`ctime`= ? where `id`= ?;";
    var params = [age,gender,describe,ctime,id];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(uploadSql,params,function(error,result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

//修改密码
function updatePersonalPassword (password,ctime,id,success) {
    var uploadSql = "update login set `password`= ?,`ctime`= ? where `id`= ?;";
    var params = [password,ctime,id];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(uploadSql,params,function(error,result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

// 管理员获取用户信息
function getUserMsg(offset, limit, success) {
    var params = [parseInt(offset), parseInt(limit)];
    var selectSql = "select * from login order by ctime desc limit ?, ?;";

    var connection = dbutil.createConnection();
    connection.connect();
    
    connection.query(selectSql, params, function(error,result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

// 管理员获取用户总数 
function getUserMsgTotal(success) {
    var selectSql = "select count(1) as count from login;";

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(selectSql, function(error,result) {
        if (error == null) {
            success(result);
            
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

// 管理员修改用户信息
function updateUserMsg (password,describe,ctime,username,success) {
    var uploadSql = "update login set `password`= ?,`describe`= ?,`ctime`= ? where `user_name`= ?;";
    var params = [password,describe,ctime,username];

    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(uploadSql,params,function(error,result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

//管理员删除用户信息
function  delUserMsg (username,success) {
    var deleteSql = "delete from login where user_name= ?;";
    var connection = dbutil.createConnection();

    connection.connect();
    connection.query(deleteSql,username,function(error,result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

module.exports.insertRegister = insertRegister;
module.exports.queryLoginByUsername = queryLoginByUsername;
module.exports.updatePersonalList = updatePersonalList;
module.exports.updatePersonalPassword = updatePersonalPassword;
module.exports.getUserMsg = getUserMsg;
module.exports.getUserMsgTotal = getUserMsgTotal;
module.exports.updateUserMsg = updateUserMsg;
module.exports.delUserMsg = delUserMsg;