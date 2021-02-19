const express = require('express');

// создать приложение методом express()
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rate-limiter');
const routes = require('./routes');

const {
  MONGO_DB_CONNECT,
  PORT,
} = require('./config.js');

// подключиться к серверу mongo
mongoose.connect(MONGO_DB_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger); // логгер запросов
app.use(limiter); // ограничить количество запросов с одного IP-адреса в единицу времени
app.use(helmet()); // проставить автоматически заголовки безопасности
app.use(bodyParser.json());
app.use(routes);
app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
});
