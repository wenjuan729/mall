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

//根据商品id查询留言
function  getComments (goodsId,success) {
    var querySql = "select * from comments where goods_id= ?;";
    var connection = dbutil.createConnection();

    connection.connect();
    connection.query(querySql,goodsId,function(error,result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

function addZan (Zan,Id,success) {
    var zan = ++ Zan;
    var updateSql = "update comments set zan= ? where id= ?;";
    var params = [zan,Id];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(updateSql,params,function(error,result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

//根据Id查询留言
function  getCommentsById (Id,success) {
    var querySql = "select * from comments where id= ?;";
    var connection = dbutil.createConnection();

    connection.connect();
    connection.query(querySql,Id,function(error,result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

//删除留言
function  deleatComment (Id,success) {
    var deleteSql = "delete from comments where id= ?;";
    var connection = dbutil.createConnection();

    connection.connect();
    connection.query(deleteSql,Id,function(error,result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

module.exports = {"insertComments":insertComments,
                  "getComments":getComments,
                  "addZan":addZan,
                  "getCommentsById":getCommentsById,
                  "deleatComment":deleatComment
                 };