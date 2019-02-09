var commentDao = require('../dao/commentsDao');
var timeUtil = require('../util/TimeUtil');
var respUtil = require("../util/RespUtil");
var fs = require("fs");
var url = require("url");

var path = new Map();

//写入留言
function insertComments(request,response) {
    var params = url.parse(request.url,true).query;
    commentDao.insertComments(params.user_name,params.content,params.goods_id,timeUtil.getNow(),function () {
        console.log("写库成功");
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(respUtil.writeResult("success","留言信息上传成功",null));
        response.end();
    })  
}

path.set("/insertComments",insertComments);

//根据goodsId查询留言
function getComments (request,response) {
    var params = url.parse(request.url,true).query;
    commentDao.getComments (params.goods_id,function (result) {
        response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
        response.write(JSON.stringify(result));
        response.end();
    })
}
path.set("/getComments" ,getComments);

//点击一次，赞的数目+1
function addZan(request,response) {
    var params = url.parse(request.url,true).query;
    // console.log(params)
    commentDao.addZan(params.zan,params.id,function (result) {
        if(result) {
            commentDao.getCommentsById(params.id,function(result) {
                response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                response.write(JSON.stringify(result));
                response.end();
            })
        }
    })
}
path.set("/addZan",addZan);

//删除留言
function deleatComment(request,response) {
    var params = url.parse(request.url,true).query;
    commentDao.deleatComment(params.id,function (result) {
        if(result) {
            commentDao.getCommentsById(params.id,function(result) {
                response.writeHead(200,{"Content-Type":"text/html;charset=utf-8"});
                response.write(respUtil.writeResult("success","留言信息删除成功",null));
                response.end();
            })
        }
    })
}
path.set("/deleatComment",deleatComment);

module.exports.path = path;