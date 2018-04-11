const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.toJSON = function () { // instance method
  let user = this;
  
  return {
    _id: user._id,
    email: user.email
  };
};

userSchema.methods.generateAuthToken = function () { // instance method
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'salty').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

userSchema.methods.removeToken = function (token) {
  let user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

userSchema.statics.findByToken = function (token) { // model method
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'salty');
  } catch (e) {
    // return new Promise((resolve, reject) => {
    //   reject();
    // });
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

userSchema.statics.findByCredentials = function (email, password) {
  let User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return bcrypt.compare(password, user.password).then((res) => {
      if (res) {
        return Promise.resolve(user);
      }
      return Promise.reject();
    });
  });
};

userSchema.pre('save', function (next) {
  let user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

let User = mongoose.model('User', userSchema);

module.exports = {
  User
};
