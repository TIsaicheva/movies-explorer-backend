require('dotenv').config();

const {
  MONGO_DB_CONNECT = 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET = 'dev-secret-key',
  NODE_ENV = 'development',
  PORT = 3000,
} = process.env;

module.exports = {
  MONGO_DB_CONNECT,
  JWT_SECRET,
  NODE_ENV,
  PORT,
};
