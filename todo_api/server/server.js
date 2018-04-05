const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

// let newTodo = new Todo({
//   text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo')
// });

let newTodo = new Todo({
  text: 'Revise physics',
  completed: true,
  completedAt: 190318
});

newTodo.save().then((doc) => {
  console.log(`Saved todo ${doc}`);
}, (e) => {
  console.log('Unable to save todo');
});
