var dbutil = require("./dbutil");

function insertGoodsList(username,category,title,price,quality,address,deliver,introduce,fileName,fileSize,filePath,ctime,utime,success) {
    var insertSql = "insert into goods (user_name,category,title,price,quality,address,deliver,introduce,file_name,file_size,file_path,ctime,utime) values(?,?,?,?,?,?,?,?,?,?,?,?,?);";
    var params = [username,category,title,price,quality,address,deliver,introduce,fileName,fileSize,filePath,ctime,utime];
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

module.exports = {"insertGoodsList":insertGoodsList};