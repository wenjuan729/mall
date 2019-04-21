var dbutil = require("./dbutil");

//增加商品订单
function addBuyGoods(username,goodsTitle,goodsPrice,goodsImg,ctime,success) {
    var insertSql = "insert into personalbuygoods (`username`,`goods_title`,`goods_price`,`goods_img`,`ctime`) values (?,?,?,?,?);";
    var params = [username,goodsTitle,goodsPrice,goodsImg,ctime];
    // console.log (params)

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

//管理员分页查看所有订单信息
function adminGetAllBuyGoodsList(offset, limit, success) {
    var params = [parseInt(offset), parseInt(limit)];
    var selectSql = "select * from personalbuygoods order by ctime desc limit ?, ?;";

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

//管理员获取订单总数
function adminGetAllBuyGoodsTotal(success) {
    var selectSql = "select count(1) as count from personalbuygoods;";

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

//管理员删除订单信息
function  adminDelBuyGoods (buyGoodsId,success) {
    var deleteSql = "delete from personalbuygoods where buy_goods_id= ?;";
    var connection = dbutil.createConnection();

    connection.connect();
    connection.query(deleteSql,buyGoodsId,function(error,result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error);
        }
    });
    connection.end();
}

module.exports = {"addBuyGoods":addBuyGoods,
                  "queryBuyGoodsByUsername":queryBuyGoodsByUsername,
                  "adminGetAllBuyGoodsList":adminGetAllBuyGoodsList,
                  "adminGetAllBuyGoodsTotal":adminGetAllBuyGoodsTotal,
                  "adminDelBuyGoods":adminDelBuyGoods,
                }