//一个小程序：自动获取web路径下的文件，并且自动的将文件加载进来
var fs = require("fs");
var globalConfig = require("./config");

var controllerSet = [];
var pathMap = new Map();

var files = fs.readdirSync(globalConfig["web_path"]);
// console.log(files)

for(var i = 0; i < files.length; i++) {
    // console.log(globalConfig["web_path"] + files[i]);
    var temp = require("./" + globalConfig["web_path"] +"/" + files[i]);
    if(temp.path) {//controll文件必须会导出一个path，如果没有path的就不需要push进去了
        for(var [key,value] of temp.path) {
            if(pathMap.get(key) == null) {
                pathMap.set(key,value);
            }else{
                var errorMsg = "url path异常，url:" + key;
                throw new Error(errorMsg);
            }
            controllerSet.push(temp);
        }
        
    }
}
// console.log(controllerSet)
module.exports = pathMap;