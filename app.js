const mysql = require('mysql');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require('fs');


const flash = require('express-flash');
const session = require('express-session');
const mysqlConnection  = require('./models/db');
const hbs = require('hbs');
const index = require('./routes/admin/index');
const adminProductRouter = require('./routes/admin/product');
const roomRouter = require('./routes/admin/room');
const typeRoomRouter = require('./routes/admin/typeRoom');
const rentRoomRouter = require('./routes/admin/rentroom');
const staffRouter = require('./routes/admin/staff');
const ruleRouter = require('./routes/admin/rule');
const customerRouter = require('./routes/admin/customer');
const revenueRouter = require('./routes/admin/revenueReport');
const loginRouter = require('./routes/admin/login');
const logoutRouter = require('./routes/admin/logout');
const densityRouter = require('./routes/admin/densityReport');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// hbs.registerPartials(__dirname + '/views/partials/frontend');
hbs.registerPartials(__dirname + '/views/partials/frontend')
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(__dirname + '/public'));
// res.locals is an object passed to hbs engine
app.use(function(req, res, next) {
    res.locals.session = req.session;
    res.locals.user = req.user;
    next();
});

app.use(
    session({
      resave: true,
      saveUninitialized: true,
      secret:"yash is a super star",
      cookie: { secure: false, maxAge: 14400000 },
    })
);

app.use(express.static(path.join(__dirname, '/publics/')));

app.use('/login', loginRouter);

app.use('*', function (req, res, next) {
    if (!req.session.user) {
        res.redirect('/login');
    }
    else {
        next();
    }
});


app.use(flash());
app.use('/', index);
app.use('/admin',adminProductRouter);
app.use('/room',roomRouter);
app.use('/typeroom',typeRoomRouter);
app.use('/rentroom',rentRoomRouter);
app.use('/staff',staffRouter);
app.use('/rule-info',ruleRouter);
app.use('/customer',customerRouter);
app.use('/revenueReport',revenueRouter);
app.use('/densityReport',densityRouter);
app.use('/logout', logoutRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
