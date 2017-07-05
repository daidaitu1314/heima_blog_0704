var express = require('express');
var router = express.Router();

var articleCtrl = require('../controller/articleCtrl.js');

router
  .get('/article/add', articleCtrl.showArticleAddPage) // 展示文章添加页面
  .post('/article/add', articleCtrl.addArticle) // 添加文章
  .get('/article/info', articleCtrl.showArticleInfo) // 展示文章详细
  .get('/article/edit', articleCtrl.showEditPage) // 展示文章编辑页面
  .post('/article/edit', articleCtrl.editArticleById) // 保存最新编辑的文章

module.exports = router;