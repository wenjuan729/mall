var goodsDao = require('../dao/goodsDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require("../util/RespUtil");
var fs = require("fs");
var url = require("url");

var path = new Map();

//上传商品信息
function uploadGoods(request,response) {
    var params = url.parse(request.url,true).query;

    goodsDao.insertGoodsList(request.cookies.username,params.category,params.title,params.price,params.quality,params.address,params.deliver,params.introduce,request.file.originalname,request.file.size,request.file.path,timeUtil.getNow(),timeUtil.getNow(),function () {
        console.log("写库成功");
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(respUtil.writeResult("success","商品信息上传成功",null));
        response.end();
    })  
}

path.set("/uploadGoods",uploadGoods);

//个人中心页根据用户名查找上传的所有商品
function queryGoodsByUsername (request,response) {
    goodsDao.queryGoodsByUsername (request.cookies.username,function (result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(JSON.stringify(result));
        response.end();
    })
}
path.set("/queryGoodsByUsername" ,queryGoodsByUsername);

//更改商品信息
function updateGoodList (request,response) {
    var params = url.parse(request.url,true).query;
    console.log(params);
    goodsDao.updateGoodList(params.category,params.title,params.price,params.quality,params.address,params.deliver,params.introduce,timeUtil.getNow(),params.goods_id,function (result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(respUtil.writeResult("success","商品信息修改成功",JSON.stringify(result)));
        response.end();
    })
}
path.set("/updateGoodList" ,updateGoodList);

//通过当前页查询最新的商品信息
function getAllGoodsByPage (request,response) {
    var params = url.parse(request.url,true).query;
    goodsDao.getAllGoodsByPage(parseInt(params.currentPage),parseInt(params.pageSize),function(result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(JSON.stringify(result));
        response.end();
    })
}
path.set("/getAllGoodsByPage" ,getAllGoodsByPage);

//获取当前商品总数
function getAllGoodsCount (request,response) {
    goodsDao.getAllGoodsCount(function (result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(JSON.stringify(result));
        response.end();
    });
}
path.set("/getAllGoodsCount" ,getAllGoodsCount);

//获取商品图片
function getPic(request,response) {
    var params = url.parse(request.url,true).query;
    // console.log(params);
    try{
        var data = fs.readFileSync("./" + params.path);
        response.writeHead(200);
        response.write(data);
        response.end();
    }catch(e) {
        response.writeHead(404);
        response.end();
    }
}
path.set("/getPic",getPic);

//更改商品浏览次数
function updateViews(request,response) {
    var params = url.parse(request.url,true).query;
    goodsDao.updateViews(params.view,params.goods_id,function (result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(JSON.stringify(result));
        response.end();
    })
}
path.set("/updateViews",updateViews);

//搜索页面，获取到所有商品
function getSearchGoods (request,response) {
    goodsDao.getSearchGoods(function(result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(JSON.stringify(result));
        response.end();
    })
}
path.set("/getSearchGoods",getSearchGoods);

module.exports.path = path;