const express = require('express');
const hbs = require('hbs');

const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>Hello Express!</h1>');
  // res.send({
  //   name: 'George',
  //   likes: [
  //     'Cats',
  //     'Alice'
  //   ]
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my home page! I am learning templating for express',
  });
});

app.get('/about', (req, res) => {
  // res.send('<h1>About Page</h1>');
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error handling this request'
  });
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
