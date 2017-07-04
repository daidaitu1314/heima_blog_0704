var express = require('express');

var router = express.Router();

var userCtrl = require('../controller/userCtrl.js');
router
  .get('/register', userCtrl.getRegisterPage) // 访问注册页面
  .get('/login', userCtrl.getLoginPage) // 访问登录页面
  .post('/register', userCtrl.registerNewUser) // 注册新用户
  .post('/login', userCtrl.login) // 用户登录
  .get('/logout', userCtrl.logout) // 注销登录

module.exports = router;