// 项目入口文件
var fs = require('fs');
var path = require('path');
// 导入 express 模块
var express = require('express');
// 创建 express 的服务器实例
var app = express();

// 1. 导入 Session 中间件
var session = require('express-session');
// 2. 注册 session 中间件
app.use(session({
  secret: '12345*&……%￥#@', // 加密 Session 时候的追加的加密字符串
  resave: false, // 是否允许session重新设置
  saveUninitialized: true // 是否设置session在存储容器中可以给修改
}));

// 导入 解析 post 表单数据的 中间件
var bodyParser = require('body-parser');
// 注册 解析表单 Post 数据的 中间件
app.use(bodyParser.urlencoded({ extended: false }));

// 托管静态资源文件
app.use('/node_modules', express.static('node_modules'));
// 设置模板引擎
app.set('view engine', 'ejs');
// 模板页面的存放路径
app.set('views', './views');

// 解决方案：想办法，让程序启动的时候，自动注册 /router 文件夹下面的所有路由模块
fs.readdir(path.join(__dirname, './router'), (err, filenames) => {
  if (err) throw err;
  filenames.forEach(filename => {
    // 这个 routerPath 就是每个 路由模块 对应的 require 时候的 path
    var routerPath = path.join(__dirname, './router', filename);
    // 根据每个路由模块的路径，自动 require 路由模块
    var routerModule = require(routerPath);
    // 根据自动 require 进来的路由模块,自动去注册这个路由模块
    app.use(routerModule);
  });
});

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3005, function () {
  console.log('Express server running at http://127.0.0.1:3005');
});