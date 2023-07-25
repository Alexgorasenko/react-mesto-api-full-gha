const express = require('express');

const mongoose = require('mongoose');

const app = express();

const { errors } = require('celebrate');

const router = require('./routes/index');

const error = require('./middlewares/error');
const cors = require('./middlewares/cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(express.json());

app.use(requestLogger);

app.use(cors);

app.use(router);

app.use(errorLogger);

app.use(errors());
app.use(error);
app.listen(3005, () => {
  console.log('Сервер запущен!');
});
