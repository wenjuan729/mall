var dbutil = require("./dbutil");

//写入留言信息
function insertComments(username,content,goodsId,ctime,success) {
    var insertSql = "insert into comments (user_name,content,goods_id,ctime) values(?,?,?,?);";
    var params = [username,content,goodsId,ctime];
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

module.exports = {"insertComments":insertComments,
                 };