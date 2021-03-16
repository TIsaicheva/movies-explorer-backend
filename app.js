const express = require('express');

// создать приложение методом express()
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cors = require('cors');

const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const limiter = require('./middlewares/rate-limiter');
const routes = require('./routes');

const {
  MONGO_DB_CONNECT,
  PORT,
} = require('./config.js');

// const whitelist = ['http://localhost:3001', 'https://tisaichdiplom.students.nomoredomains.icu', 'http://tisaichdiplom.students.nomoredomains.icu'];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true,
// };

// подключиться к серверу mongo
mongoose.connect(MONGO_DB_CONNECT, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(requestLogger); // логгер запросов

app.use(cors({
  origin: 'https://tisaichdiplom.students.nomoredomains.icu',
  credentials: true,
}));

app.use(limiter); // ограничить количество запросов с одного IP-адреса в единицу времени
app.use(helmet()); // проставить автоматически заголовки безопасности
app.use(bodyParser.json());
app.use(routes);
app.use(errorLogger); // логгер ошибок
app.use(errors()); // обработчик ошибок celebrate
app.use(errorHandler); // централизованный обработчик ошибок

app.listen(PORT, () => {
});
