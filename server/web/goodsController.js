var goodsDao = require('../dao/goodsDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require("../util/RespUtil");
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


module.exports.path = path;