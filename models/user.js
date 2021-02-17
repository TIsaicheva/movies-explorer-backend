const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const NoAuthorizationError = require('../errors/no-auth-err');
const { INCORRECT_EMAIL_PASSW_ERR } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: (props) => `${props.value} is not correct email!`,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new NoAuthorizationError(INCORRECT_EMAIL_PASSW_ERR));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new NoAuthorizationError(INCORRECT_EMAIL_PASSW_ERR));
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
