var dbutil = require("./dbutil");

//增加商品订单
function addBuyGoods(username,goodsTitle,goodsPrice,goodsImg,ctime,success) {
    var insertSql = "insert into personalbuygoods (`username`,`goods_title`,`goods_price`,`goods_img`,`ctime`) values (?,?,?,?,?);";
    var params = [username,goodsTitle,goodsPrice,goodsImg,ctime];
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

//根据用户名查询已购买商品
function queryBuyGoodsByUsername (username,success) {
    var querySql = "select * from personalbuygoods where username= ?;";
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


module.exports = {"addBuyGoods":addBuyGoods,
                  "queryBuyGoodsByUsername":queryBuyGoodsByUsername  
                }