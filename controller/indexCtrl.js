module.exports = {
  showIndexPage(req, res) { // 显示首页页面
    res.render('index', {
      islogin: req.session.islogin, // 如果保存了登录状态，则通过 req.session.islogin 获取到的登录状态为 true，如果没有保存登录状态，则获取到的 req.session.islogin 是一个 undefined
      user: req.session.user // 将登录人的信息，渲染给页面
    });
  }
}