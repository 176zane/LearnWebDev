//处理错误中间件
var createError = require('http-errors');
var express = require('express');
//用于解析文件和目录的核心 node 库
var path = require('path');
//用于解析 cookie 头来填充 req.cookies（提供了访问 cookie 信息的便捷方法）
var cookieParser = require('cookie-parser');
//node 专用 HTTP 请求记录器中间件
var logger = require('morgan');
//require用户路由目录中的模块
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// 设置 Mongoose 连接
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/local_library';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB 连接错误：'));


// 设置视图引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//将中间件库添加进请求处理链
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//将项目根目录下所有静态文件托管至 /public 目录
app.use(express.static(path.join(__dirname, 'public')));

//把（之前导入的）路由处理器添加到请求处理链中。从而为网站的不同部分定义具体的路由
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
// 捕获 404 并抛给错误处理器
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
