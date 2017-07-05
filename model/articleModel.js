var moment = require('moment');
// 作者表
var UserModel = require('./userModel.js');

// 每个表对象中，字段的属性类型，在Sequelize中定义
var Sequelize = require('sequelize');
// 导入数据库连接对象，通过连接对象的 .define 方法，定义一个表对象
var Db = require('./baseDb.js');

var Article = Db.define('articles', {
  id: { // 主键Id
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
    type: Sequelize.INTEGER
  },
  title: { // 文章标题
    allowNull: false,
    type: Sequelize.STRING
  },
  content: { // 文章内容
    allowNull: false,
    type: Sequelize.TEXT // 注意：如果是大量文本的时候，使用 TEXT 类型，如果大量文本还是用STRING，会存在文章内容被截取的问题
  },
  authorId: { // 作者Id，将来，如果需要显示这篇文章的作者，可以通过 authorId 去 User 表中找到对应作者的 username 和 nickname
    allowNull: false,
    type: Sequelize.INTEGER
  }
}, {
    getterMethods: {
      ctime() { // 格式化好的发表时间
        return moment(this.createdAt).format('YYYY-MM-DD HH:mm:ss')
      },
      mtime() { // 格式化好的最后修改时间
        return moment(this.updatedAt).format('YYYY-MM-DD HH:mm:ss')
      }
    }
  });

// 当前得到文章属于哪个作者
// 也就是说：文章表中的某一篇文章，属于作者表中的某一个作者
Article.belongsTo(UserModel, {
  foreignKey: 'authorId', // Article表通过 foreignKey 指定对外关联的字段 是 authorId
  targetKey: 'id' // 通过 targetKey 来指定被关联的 目标表（UserModel） 中的关联字段是 `id`
})

module.exports = Article;