var mongoose = require('mongoose');

//mongoose connect
mongoose.connect('mongodb://test:testing@ds161295.mlab.com:61295/homeautomationalpha1');

//defining schema for Todo
var TodoSchema = new mongoose.Schema({
	text: String
});

//creating model
var Todo = mongoose.model('Todo', TodoSchema);

//listing all todos
var allList = function (callback) {
	Todo.find(callback);
};

//creating a new todo
var createTodo = function (data, callback) {

	Todo.create({
		text: data.text,
		done: false
	}, function (err, todo) {
		if (err) {
			return callback(err, todo);
		}

		return allList(callback);
	});
};

//removing a todo
var removeTodo = function (data, callback) {

	Todo.remove({
		_id: data.todo_id
	}, function (err, todo) {
		if (err) {
			return callback(err, todo);
		}

		return allList(callback);
	})
};

exports.allList = allList;
exports.createTodo = createTodo;
exports.removeTodo = removeTodo;
