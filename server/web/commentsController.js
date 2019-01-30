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



module.exports.path = path;