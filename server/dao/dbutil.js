//连接数据库，不同的语言使用不同的驱动去调用MySQL
//一般一个项目对应一个数据库，一个dao对应一个表
var mysql = require("mysql");
// console.log(mysql);

//创建连接
// var connection = mysql.createConnection({
//     host:"127.0.0.1",
//     port:"3306",//mysql的端口
//     user:"root",
//     password:"1970374991zwj",
//     database:"shool"
// });

//解决登录的时候第二次登录会断开连接就报错的问题，所以就把创建连接写在函数里
//这样子就可以做到每一次创建都是一次新的连接，每次结束就关掉连接。
function createConnection () {
    var connection = mysql.createConnection({
        host:"127.0.0.1",
        port:"3306",//mysql的端口
        user:"root",
        password:"1970374991zwj",
        database:"mall"
    });
    return connection;
}

module.exports.createConnection = createConnection;