const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TodoApp');

let Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

let User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
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

// let newTodo = new Todo({
//   text: 'Revise physics',
//   completed: true,
//   completedAt: 190318
// });

// newTodo.save().then((doc) => {
//   console.log(`Saved todo ${doc}`);
// }, (e) => {
//   console.log('Unable to save todo');
// });

let newUser = new User({
  email: 'g.richards101@gmail.com'
});

newUser.save().then((doc) => {
  console.log(`Saved user ${JSON.stringify(doc, undefined, 2)}`);
}, (e) => {
  console.log('Unable to save', e);
});
