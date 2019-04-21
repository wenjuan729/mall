var express = require("express");
var loader = require("./loader");
var globalConfig = require("./config");
var cookie = require("cookie-parser");
var multer = require("multer");

var app = new express();
var uploadSingle = multer({dest:"./file/"});

app.use(cookie());
app.use(express.static(globalConfig["page_path"]));

app.get("/editRegister",loader.get("/editRegister"));

app.get("/login",loader.get("/login"));

app.post("/uploadGoods",uploadSingle.single("file"),loader.get("/uploadGoods"));

app.get("/queryLoginByUsername",loader.get("/queryLoginByUsername"));

app.get("/queryGoodsByUsername",loader.get("/queryGoodsByUsername"));

app.get("/updateGoodList",loader.get("/updateGoodList"))

app.get("/getAllGoodsByPage",loader.get("/getAllGoodsByPage"))

app.get("/getPic",loader.get("/getPic"))

app.get("/getAllGoodsCount",loader.get("/getAllGoodsCount"))

app.get("/updateViews",loader.get("/updateViews"))

app.get("/insertComments",loader.get("/insertComments"))

app.get("/getComments",loader.get("/getComments"))

app.get("/addZan",loader.get("/addZan"))

app.get('/getSearchGoods',loader.get("/getSearchGoods"))

app.get('/getPhoneGoodsByPage',loader.get("/getPhoneGoodsByPage"))

app.get('/getPhoneGoodsCount',loader.get("/getPhoneGoodsCount"))

app.get('/getClothesGoodsByPage',loader.get("/getClothesGoodsByPage"))

app.get('/getClothesGoodsCount',loader.get("/getClothesGoodsCount"))

app.get('/getBeautyGoodsByPage',loader.get("/getBeautyGoodsByPage"))

app.get('/getBeautyGoodsCount',loader.get("/getBeautyGoodsCount"))

app.get('/getOtherGoodsByPage',loader.get("/getOtherGoodsByPage"))

app.get('/getOtherGoodsCount',loader.get("/getOtherGoodsCount"))

app.get("/deleatComment",loader.get("/deleatComment"))

app.get("/deleatGoods",loader.get("/deleatGoods"))

app.get("/updatePersonalList",loader.get("/updatePersonalList"))

app.get("/updatePersonalPassword",loader.get("/updatePersonalPassword"))

app.get("/addBuyGoods",loader.get("/addBuyGoods"))

app.get("/queryBuyGoodsByUsername",loader.get("/queryBuyGoodsByUsername"))

// 管理员获取用户信息
app.get("/getUserMsg", loader.get("/getUserMsg"));

//管理员修改用户信息
app.get("/updateUserMsg", loader.get("/updateUserMsg"));

//管理员删除用户
app.get("/delUserMsg", loader.get("/delUserMsg"));

//管理员修改用户信息
app.get("/AdminUpdateGoodList", loader.get("/AdminUpdateGoodList"));

//管理员获取订单信息
app.get("/adminGetAllBuyGoodsList", loader.get("/adminGetAllBuyGoodsList"));

//管理员删除订单
app.get("/adminDelBuyGoods", loader.get("/adminDelBuyGoods"));

//管理员根据用户名查询用户订单
app.get("/adminGetBuyGoodsByUsername", loader.get("/adminGetBuyGoodsByUsername"));

app.listen(globalConfig["port"],function () {
    console.log("服务已启动");
});

