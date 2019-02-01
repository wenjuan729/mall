var express = require("express");
var loader = require("./loader");
var globalConfig = require("./config");
var cookie = require("cookie-parser");
var multer = require("multer");

var app = new express();
var uploadSingle = multer({dest:"./file/"});

app.use(cookie());

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


app.listen(globalConfig["port"],function () {
    console.log("服务已启动");
});

