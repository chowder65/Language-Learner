var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cons = require('consolidate');
var session = require('express-session')
const cors = require('cors');

var indexRouter = require('./Back/routes/index');
var usersRouter = require('./Back/routes/users');
var loginRouter = require('./Back/routes/login');
var lessonRouter = require('./Back/routes/lesson');
var quizRouter = require('./Back/routes/quiz');
var questionRouter = require('./Back/routes/questions');
var audioRouter = require('./Back/routes/audio');
var logoutRouter = require('./Back/routes/logout')

var app = express();

app.engine('html', cons.swig);
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
app.use(session({
  secret: 'UserLoginSession', //can be anything, needs to be secure and realted to project
  resave: false,
  saveUninitialized: true,
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/lesson', lessonRouter);
app.use('/quiz', quizRouter);
app.use('/questions', questionRouter);
app.use('/audio', audioRouter);
app.use('/test', require('./Back/routes/test'));
app.use('/logout', logoutRouter)


// catch 404 and forward to error handler
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
