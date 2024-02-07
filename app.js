const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errors } = require("celebrate");
const routers = require("./routes/index");
const rateLimit = require('express-rate-limit');
const handlerErrors = require("./middlewares/handlerErrors");

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100, // лимит запросов 100
  keyGenerator: function (req) {
    return req.user._id;
  },
  handler: function (req, res, next) {
    res.status(429).json({
      message: "Слишком много запросов, пожалуйста, повторите попытку позже.",
    });
    next();
  },
});

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
// app.use(bodyParser.json()); // для собирания JSON-формата
// app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.use(requestLogger); //логгер запросов
app.use(routers); //роуты

app.use(errorLogger); //логгер ошибок
app.use(errors());
app.use(handlerErrors); //центральный обработчик ошибок

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb', {
}).then(() => {
  console.log("'соединение с базой установлено");
})
  .catch((err) => {
    console.log(`DB connection error:${err}`);
    console.log("'соединение с базой прервано");
  });

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
