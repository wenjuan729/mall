var registerDao = require("../dao/registerDao");
var timeUtil = require('../util/TimeUtil');
var respUtil = require("../util/RespUtil")
var url = require("url");

var path = new Map();

//注册账号
function editRegister (request,response) {
    var params = url.parse(request.url,true).query;
    registerDao.queryLoginByUsername(params.username,function(result) {
        if(JSON.stringify(result) !== '[]') {
            response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            response.write(respUtil.writeResult("error","用户名已被注册",null));
            response.end();
        }else{
            registerDao.insertRegister(params.username, params.password,params.age,params.gender,params.describe,timeUtil.getNow(),function(result) {
            response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            response.write(respUtil.writeResult("success","注册成功",null));
            response.end(); 
            })
        }    
    })   
}

path.set("/editRegister",editRegister);

//登录接口
function login (request,response) {
    var params = url.parse(request.url,true).query;
    console.log(params)
    registerDao.queryLoginByUsername(params.username,function(result) {
        if(result && result.length > 0 && result[0].password == params.password) {
            //登录成功就写cookie,存入username和password
            response.cookie("username",result[0].user_name);
            response.cookie("password",result[0].password);
            response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            response.write(respUtil.writeResult("success","登录成功",JSON.stringify(result)));
            response.end();
        }else{
            response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            response.write(respUtil.writeResult("error","用户名或者密码不正确",null));
            response.end();
        }
        
    });
}

path.set("/login" ,login);

module.exports.path = path;