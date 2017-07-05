var ArticleModel = require('../model/articleModel.js');
var UserModel = require('../model/userModel.js');

module.exports = {
  showIndexPage(req, res) { // 显示首页页面
    // 列表分页，需要那几个关键属性：
    // 每页展示几条数据：pageSize
    var pageSize = require('../common.js').pageSize;
    // 总记录条数：totalCount
    // 当前页码：nowPage
    var nowPage = parseInt(req.query.page || 1);
    // 第1页数据：    0   1
    // 第2页数据：    2   3
    // 第3页数据：    4   5
    // (nowPage-1) * pageSize


    // 在渲染首页之前，先获取到所有的文章列表
    ArticleModel.sync()
      .then(() => {
        // findAndCountAll 方法，查询到的结果是一个对象
        // 对象身上有两个属性：
        // 第一个是总记录条数,是一个数字，属性名是 count
        // 第二个是查询到的符合条件的数据集合，是一个数组，属性名是 rows
        return ArticleModel.findAndCountAll({
          attributes: ['id', 'title', 'createdAt'], // 自定义要查询的字段，提高查询性能
          order: [ // 排序字段
            ['createdAt', 'desc']
          ],
          include: [UserModel],
          offset: (nowPage - 1) * pageSize, // 查询的起始位置
          limit: pageSize // 从起止位置开始，总共要查询几条数据
        }); // 查询所有的文章列表
      })
      .then((obj) => {
        console.log(obj);
        res.render('index', {
          islogin: req.session.islogin, // 如果保存了登录状态，则通过 req.session.islogin 获取到的登录状态为 true，如果没有保存登录状态，则获取到的 req.session.islogin 是一个 undefined
          user: req.session.user, // 将登录人的信息，渲染给页面
          articles: obj.rows, // 查询到的所有文章数据
          totalCount: obj.count, // 总记录条数
          pageSize:pageSize, // 每页展示的条数
          nowPage: nowPage // 当前请求的页码
        });
      })
  }
}