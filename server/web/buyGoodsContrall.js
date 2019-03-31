var buyGoodsDao = require("../dao/buyGoodsDao");
var timeUtil = require('../util/TimeUtil');
var respUtil = require("../util/RespUtil");
var url = require("url");

var path = new Map();

//增加商品订单
function addBuyGoods(request,response) {
    var params = url.parse(request.url,true).query;
    console.log(params)
    buyGoodsDao.addBuyGoods(params.username,params.goodsTitle,params.goodsPrice,params.goodsImg,timeUtil.getNow(),function () {
        console.log("写库成功");
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(respUtil.writeResult("success","订单创建成功",null));
        response.end();
    })  
}

path.set("/addBuyGoods",addBuyGoods);

//根据用户名查询已购买商品
function queryBuyGoodsByUsername (request,response) {
    buyGoodsDao.queryBuyGoodsByUsername (request.cookies.username,function (result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(JSON.stringify(result));
        response.end();
    })
}
path.set("/queryBuyGoodsByUsername" ,queryBuyGoodsByUsername);




module.exports.path = path;