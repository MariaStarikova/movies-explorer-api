const express = require('express');
const mongoose = require('mongoose');
require("dotenv").config();
// const bodyParser = require('body-parser');
const routers = require("./routes/index");
const handlerErrors = require("./middlewares/handlerErrors");

// Слушаем 3000 порт
const { PORT = 3000 } = process.env;

const app = express();
// app.use(bodyParser.json()); // для собирания JSON-формата
// app.use(bodyParser.urlencoded({ extended: true })); // для приёма веб-страниц внутри POST-запроса

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routers);

app.use(handlerErrors); //центральный обработчик ошибок

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  // useNewUrlParser: true,
  // useCreateIndex: true,
  //   useFindAndModify: false
}).then(() => {
  console.log("'соединение с базой установлено");
})
  .catch((err) => {
    console.log(`DB connection error:${err}`);
    console.log("'соединение с базой прервано");
    // process.exit(1);
  });

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`);
});
