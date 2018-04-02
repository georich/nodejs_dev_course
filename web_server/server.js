const express = require('express');

const app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  res.send({
    name: 'George',
    likes: [
      'Cats',
      'Alice'
    ]
  });
});

app.get('/about', (req, res) => {
  res.send('<h1>About Page</h1>');
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error handling this request'
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
