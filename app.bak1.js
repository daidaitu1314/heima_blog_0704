// 项目入口文件
var fs = require('fs');
var path = require('path');
// 导入 express 模块
var express = require('express');
// 创建 express 的服务器实例
var app = express();

// 托管静态资源文件
app.use('/node_modules', express.static('node_modules'));
// 设置模板引擎
app.set('view engine', 'ejs');
// 模板页面的存放路径
app.set('views', './views');

// 渲染首页
// app.get('/', (req, res) => {
//   res.render('index');
// });

// 导入 indexRouter 路由模块
/*var indexRouter = require('./router/indexRouter.js');
// 注册路由
app.use(indexRouter);
// 导入 userRouter 路由模块
var userRouter = require('./router/userRouter.js');
app.use(userRouter);*/

// 问题：由于将来会封装好多的路由模块，当路由模块多了之后，需要每次都来到 app.js 中，手动 require 路由模块。并注册
// 解决方案：想办法，让程序启动的时候，自己注册 /router 文件夹下面的所有路由模块
// 使用 fs.readdir 方法，读取 /router 目录下面所有的文件，然后得到每一个路由模块的文件路径
// 当得到每个路由模块的文件路径之后， 调用 for 循环，循环使用 require 导入每个路由模块，并 使用 app.use 来注册每个导入的路由模块
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
app.listen(3003, function () {
  console.log('Express server running at http://127.0.0.1:3003');
});