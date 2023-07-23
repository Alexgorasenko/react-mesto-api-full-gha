const express = require('express');

const mongoose = require('mongoose');

const app = express();

const { errors } = require('celebrate');

const cookieParser = require('cookie-parser');

const router = require('./routes/index');

const error = require('./middlewares/error');

const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

const allowedCors = [
  'https://api.alex-gorasenko.mesto.nomoredomains.xyz',
  'http://alex-gorasenko.mesto.nomoredomains.xyz',
  'localhost:3000',
  'https://api.alex-gorasenko.mesto.nomoredomains.xyz/users/me',
];

app.use((req, res, next) => {
  const { origin } = req.headers;

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  next();
});

app.use(express.json());

app.use(cookieParser());

app.use(requestLogger);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(error);
app.listen(3000, () => {
  console.log('Сервер запущен!');
});
