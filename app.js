const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const routers = require('./routes/index');
const handlerErrors = require('./middlewares/handlerErrors');
const limiter = require('./middlewares/limiter');

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.use(requestLogger); // логгер запросов
app.use(routers); // роуты

app.use(errorLogger); // логгер ошибок
app.use(errors());
app.use(handlerErrors); // центральный обработчик ошибок

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
}).then(() => {
  console.log('соединение с базой установлено');
})
  .catch((err) => {
    console.log(`DB connection error:${err}`);
    console.log('соединение с базой прервано');
  });

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
