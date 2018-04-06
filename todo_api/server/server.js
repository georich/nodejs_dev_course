const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {Todo} = require('./models/todo');
const {User} = require('./models/user');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  // console.log(req.body);
  let todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
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

// let newUser = new User({
//   email: 'g.richards101@gmail.com'
// });

// newUser.save().then((doc) => {
//   console.log(`Saved user ${JSON.stringify(doc, undefined, 2)}`);
// }, (e) => {
//   console.log('Unable to save', e);
// });
