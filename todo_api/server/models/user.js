const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

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

userSchema.methods.toJSON = function () {
  let user = this;
  
  return {
    _id: user._id,
    email: user.email
  };
};

userSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'salty').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

let User = mongoose.model('User', userSchema);

module.exports = {
  User
};
