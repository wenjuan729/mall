var buyGoodsDao = require("../dao/buyGoodsDao");
var registerDao = require("../dao/registerDao");
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

//管理员分页查看所有订单信息  adminGetAllBuyGoodsList
function adminGetAllBuyGoodsList(request,response) {
    var params = url.parse(request.url,true).query;
    buyGoodsDao.adminGetAllBuyGoodsList(params.offset, params.limit, function (result) {
        buyGoodsDao.adminGetAllBuyGoodsTotal(function (count) {
            response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            response.write(JSON.stringify({total: count[0].count, rows: result}));
            response.end();
        })
    })
}
path.set("/adminGetAllBuyGoodsList", adminGetAllBuyGoodsList);

//管理员删除订单信息
function adminDelBuyGoods (request,response) {
    var params = url.parse(request.url,true).query;
    buyGoodsDao.adminDelBuyGoods(params.buyGoodsId,function (result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(respUtil.writeResult("success","用户订单删除成功",null));
        response.end();
    })
}
path.set("/adminDelBuyGoods",adminDelBuyGoods);

//管理员查询某位用户订单
function adminGetBuyGoodsByUsername (request,response) {
    var params = url.parse(request.url,true).query;
    //获取到网站用户名
    registerDao.adminGetAllUsername(function (result) {
        var resultArr = JSON.parse(JSON.stringify(result));
        var usernameArr = [];
        //获取用户名数组
        resultArr.forEach(function (ele,index) {
            usernameArr.push(ele.user_name)
        })
        if(usernameArr.indexOf(params.username) != -1) {
            //存在该用户名就根据用户名查询用户订单
            buyGoodsDao.queryBuyGoodsByUsername (params.username,function (result) {
                if(result && result.length > 0) {
                    //存在订单信息就把订单信息返回
                    response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                    response.write(respUtil.writeResult("success","用户订单数据查询成功",JSON.stringify(result)));
                    response.end();
                }else{
                    //不存在订单信息就返回空
                    response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                    response.write(respUtil.writeResult("success","用户暂无订单数据",null));
                    response.end();
                }    
            })
        }else{
            //不存在用户名就返回失败信息
            response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            response.write(respUtil.writeResult("error","用户名不存在请重新输入",null));
            response.end();
        }
    })
}
path.set("/adminGetBuyGoodsByUsername" ,adminGetBuyGoodsByUsername);

// registerDao.adminGetAllUsername(function (result) {
//     var resultArr = JSON.parse(JSON.stringify(result));
//     console.log(resultArr)
//     var usernameArr = [];
//     resultArr.forEach(function (ele,index) {
//         usernameArr.push(ele.user_name)
//     })
//     console.log(usernameArr)
//     var username = '1001';
//     if(usernameArr.indexOf(username != -1)) {
//         console.log(111)
//     }

// });




module.exports.path = path;