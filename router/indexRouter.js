var express = require('express');
var router = express.Router();

var indexCtrl = require('../controller/indexCtrl.js');
router.get('/', indexCtrl.showIndexPage) // 展示首页

module.exports = router;