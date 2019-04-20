var registerDao = require("../dao/registerDao");
var timeUtil = require('../util/TimeUtil');
var respUtil = require("../util/RespUtil");
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
    registerDao.queryLoginByUsername(params.username,function(result) {
        if(result && result.length > 0 && result[0].password == params.password) {
            //登录成功就写cookie,存入username和password
            // response.cookie("username",result[0].user_name);
            // response.cookie("password",result[0].password);
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

//个人中心页根据用户名查询个人信息
function queryLoginByUsername (request,response) {
    registerDao.queryLoginByUsername(request.cookies.username,function(result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(respUtil.writeResult("success","查询个人信息成功",JSON.stringify(result)));
        response.end();
    })
}
path.set("/queryLoginByUsername" ,queryLoginByUsername);

//根据用户名ID修改用户个人信息
function updatePersonalList (request,response) {
    var params = url.parse(request.url,true).query;
    // console.log(params);
    registerDao.updatePersonalList(params.age,params.gender,params.describe,timeUtil.getNow(),params.id,function (result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(respUtil.writeResult("success","个人信息修改成功",JSON.stringify(result)));
        response.end();
    })
}
path.set("/updatePersonalList" ,updatePersonalList);

//修改密码
function updatePersonalPassword (request,response) {
    var params = url.parse(request.url,true).query;
    // console.log(params);
    registerDao.updatePersonalPassword(params.password,timeUtil.getNow(),params.id,function (result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(respUtil.writeResult("success","密码修改成功",JSON.stringify(result)));
        response.end();
    })
}
path.set("/updatePersonalPassword" ,updatePersonalPassword);

// 管理员获取用户信息
function getUserMsg(request,response) {
    // console.log(request.url)
    var params = url.parse(request.url,true).query;
    registerDao.getUserMsg(params.offset, params.limit, function (result) {
        registerDao.getUserMsgTotal(function (count) {
            response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
            response.write(JSON.stringify({total: count[0].count, rows: result}));
            response.end();
        })
    })
}
path.set("/getUserMsg", getUserMsg);

//管理员修改用户信息
function updateUserMsg (request,response) {
    var params = url.parse(request.url,true).query;
    console.log(params);
    registerDao.updateUserMsg(params.password,params.describe,timeUtil.getNow(),params.username,function (result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(respUtil.writeResult("success","用户信息修改成功",JSON.stringify(result)));
        response.end();
    })
}
path.set("/updateUserMsg" ,updateUserMsg);



module.exports.path = path;