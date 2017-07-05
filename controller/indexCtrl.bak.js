var ArticleModel = require('../model/articleModel.js');
var UserModel = require('../model/userModel.js');

module.exports = {
  showIndexPage(req, res) { // 显示首页页面
    // 在渲染首页之前，先获取到所有的文章列表
    ArticleModel.sync()
      .then(() => {
        // select id,title,createdAt from article
        return ArticleModel.findAll({
          attributes: ['id', 'title', 'createdAt'], // 自定义要查询的字段，提高查询性能
          order: [ // 排序字段
            ['createdAt', 'desc']
          ],
          include:[UserModel]
        }); // 查询所有的文章列表
      })
      .then((articleList) => {
        // console.log(articleList.length);
        res.render('index', {
          islogin: req.session.islogin, // 如果保存了登录状态，则通过 req.session.islogin 获取到的登录状态为 true，如果没有保存登录状态，则获取到的 req.session.islogin 是一个 undefined
          user: req.session.user, // 将登录人的信息，渲染给页面
          articles: articleList
        });
      })


    /*res.render('index', {
      islogin: req.session.islogin, // 如果保存了登录状态，则通过 req.session.islogin 获取到的登录状态为 true，如果没有保存登录状态，则获取到的 req.session.islogin 是一个 undefined
      user: req.session.user // 将登录人的信息，渲染给页面
    });*/
  }
}