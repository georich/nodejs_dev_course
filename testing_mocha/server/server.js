const express = require('express');

const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
  res.status(404).send({
    error: 'Page not found.',
    name: 'Todo App v1.0'
  });
});

app.get('/users', (req, res) => {
  res.send([
    {name: 'George', age: 24},
    {name: 'Alice', age: 21},
    {name: 'Bonje', age: 22}
  ]);
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports.app = app;
