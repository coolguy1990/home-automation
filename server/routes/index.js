// var express = require('express');
// var router = express.Router();
// var TodoMongo = require('../models/TodoMongo.js');

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


// //all todos
// router.get('/api/todos', function(req, res, next) {
// 	TodoMongo.allList(function (err, todos) {
// 		if (err) {
// 			return res.send(err);
// 		}

// 		return res.json(todos);
// 	});
// });

// //create todo
// router.post('/api/todos/create', function(req, res, next) {
// 	TodoMongo.createTodo(req.body, function (err, todo) {
// 		if (err) {
// 			return res.send(err);
// 		}

// 		return res.json(todo);
// 	});
// });

// //delete a todo
// router.delete('/api/todos/:todo_id', function(req, res, next) {
// 	// TodoMongo.removeTodo(req, res);
// 	TodoMongo.removeTodo(req.params, function (err, todo) {
// 		if (err) {
// 			return res.send(err);
// 		}

// 		return res.json(todo);
// 	})
// });

// module.exports = router;
