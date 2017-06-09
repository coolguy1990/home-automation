let express = require('express');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let io = require('socket.io').listen(20202);
let httpLogger = require('./logger/httpLogger');

let index = require('./routes/index');
let users = require('./routes/users');

let app = express();

io.sockets.on('connection', function (socket) {
	console.log(socket.id);
	socket.on('disconnect', function () {
		console.log(socket.id + ' left');
	});
	io.emit('message', `its alive.... ${socket.id}`);

	socket.on('button-clicked', function (data) {
		console.log('Button Status:' + data);
	});
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// adding loggers
app.use(logger('dev'));
app.use(logger('combined', {
  stream: httpLogger
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  let err = new Error('Not Found');
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
