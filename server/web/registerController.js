var registerDao = require("../dao/registerDao");
var timeUtil = require('../util/TimeUtil');
var respUtil = require("../util/RespUtil")
var url = require("url");

var path = new Map();

function editRegister (request,response) {
    var params = url.parse(request.url,true).query;
    console.log(params)
    registerDao.insertRegister(params.username, params.password,params.age,params.gender,params.describe,timeUtil.getNow(),function(result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(respUtil.writeResult("success","添加成功",null));
        response.end();
    })
}

path.set("/editRegister",editRegister);

module.exports.path = path;