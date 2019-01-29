var dbutil = require("./dbutil");

//插入商品信息
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

//根据用户名查询商品信息
function queryGoodsByUsername (username,success) {
    var querySql = "select * from goods where user_name= ?;";
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

//更改商品信息
function updateGoodList (category,title,price,quality,address,deliver,introduce,utime,goodsId,success) {
    var uploadSql = "update goods set category= ?,title= ?,price= ?,quality= ?,address= ?,deliver= ?,introduce= ?,utime= ? where goods_id= ?;";
    var params = [category,title,price,quality,address,deliver,introduce,utime,goodsId];

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

//new.vue通过当前页查询最新的商品信息
function getAllGoodsByPage (currentPage,pageSize,success) {
    var querySql = "select * from goods order by goods_id desc limit ?,?;";
    var params = [currentPage * pageSize,pageSize];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,params,function(error,result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error); 
        }
    });
    connection.end();
}

//new.vue查询当前商品总数
function getAllGoodsCount (success) {
    var querySql = "select count(1) as count from goods;";
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,function(error,result) {
        if (error == null) {
            success(result);
        } else {
            throw new Error(error); 
        }
    });
    connection.end();
}

//更改商品浏览次数
function updateViews (view,goodsId,success) {
    var views = ++ view;
    var updateSql = "update goods set views= ? where goods_id= ?;";
    var params = [views,goodsId];
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

module.exports = {"insertGoodsList":insertGoodsList,
                  "queryGoodsByUsername":queryGoodsByUsername,
                  "updateGoodList":updateGoodList,
                  "getAllGoodsByPage":getAllGoodsByPage,
                  "getAllGoodsCount":getAllGoodsCount,
                  "updateViews":updateViews
                 };