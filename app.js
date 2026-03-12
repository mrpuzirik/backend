require('dotenv').config({ quiet: true });
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

app.use((req, res) => {
  res.status(404).render('error', {
    message: 'Сторінку не знайдено',
    status: 404,
  });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).render('error', {
    message: err.message,
    status: err.status || 500,
  });
});

module.exports = app;