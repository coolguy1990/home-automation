const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const io = require('socket.io').listen(20202);
const httpLogger = require('./logger/httpLogger');

const index = require('./routes/index');
const users = require('./routes/users');

const modules = require('./routes/modules')(io);

const moduleHandler = require('./handler');
const moduleBroadcaster = moduleHandler.broadcaster;

const app = express();

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

// Module handler
moduleHandler.websocket = io;
moduleHandler.listen();
moduleBroadcaster.listen();

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
app.use('/modules', modules);

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
