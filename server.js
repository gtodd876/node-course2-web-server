const express = require('express');
const hbs = require('hbs');
const app = express();
const fs = require('fs');
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', err => {
    if (err) {
      console.error('Unable to append to server log.');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintence.hbs');
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', text => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page Booyyeeee',
    welcomeMessage: 'Welcome to my website',
    currentYear: new Date().getFullYear(),
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Todd Page',
    welcomeMessage: 'All about me me',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Error handling request',
  });
});

app.listen(port, () => {
  console.log(`Server is up on port: ${port}`);
});
