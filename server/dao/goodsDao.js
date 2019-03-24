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

//seach获取到所有商品信息
function getSearchGoods (success) {
    var querySql = "select * from goods order by goods_id desc;";
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


//phone页面，根据分页查询到phone的商品信息
function getPhoneGoodsByPage (currentPage,pageSize,success) {
    var querySql = "select * from goods where category = '手机' limit ?,?;";
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

//phone.vue查询当前phone商品总数
function getPhoneGoodsCount (success) {
    var querySql = "select count(1) as count from goods where category = '手机';";
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

//clothes页面，根据分页查询到clothes的商品信息
function getClothesGoodsByPage (currentPage,pageSize,success) {
    var querySql = "select * from goods where category = '服装' limit ?,?;";
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

//clothes.vue查询当前clothes商品总数
function getClothesGoodsCount (success) {
    var querySql = "select count(1) as count from goods where category = '服装';";
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

//beauty页面，根据分页查询到beauty的商品信息
function getBeautyGoodsByPage (currentPage,pageSize,success) {
    var querySql = "select * from goods where category = '美妆' limit ?,?;";
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

//beauty.vue查询当前美妆商品总数
function getBeautyGoodsCount (success) {
    var querySql = "select count(1) as count from goods where category = '美妆';";
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

//other页面，根据分页查询到other的商品信息
function getOtherGoodsByPage (currentPage,pageSize,success) {
    var querySql = "select * from goods where category = '其它类' limit ?,?;";
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

//other.vue查询当前其他类的商品总数
function getOtherGoodsCount (success) {
    var querySql = "select count(1) as count from goods where category = '其它类';";
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

//删除商品
function  deleatGoods (Id,success) {
    var deleteSql = "delete from goods where goods_id= ?;";
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



module.exports = {"insertGoodsList":insertGoodsList,
                  "queryGoodsByUsername":queryGoodsByUsername,
                  "updateGoodList":updateGoodList,
                  "getAllGoodsByPage":getAllGoodsByPage,
                  "getAllGoodsCount":getAllGoodsCount,
                  "updateViews":updateViews,
                  "getSearchGoods":getSearchGoods,
                  "getPhoneGoodsByPage":getPhoneGoodsByPage,
                  "getPhoneGoodsCount":getPhoneGoodsCount,
                  "getClothesGoodsByPage":getClothesGoodsByPage,
                  "getClothesGoodsCount":getClothesGoodsCount,
                  "getBeautyGoodsByPage":getBeautyGoodsByPage,
                  "getBeautyGoodsCount":getBeautyGoodsCount,
                  "getOtherGoodsByPage":getOtherGoodsByPage,
                  "getOtherGoodsCount":getOtherGoodsCount,
                  "deleatGoods":deleatGoods,
                 };