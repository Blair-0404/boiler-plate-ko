const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // 다운받았던 bcrypt 가져오기
const saltRounds = 10;
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  password: {
    type: String,
    minlength: 5
  },
  lastname: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  image: String,
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
});

// restapi가 안되서 일단 주석처리
userSchema.pre('save', function (next) {
  const user = this;

  if (user.isModified('password')) { // 비번이 수정될때만 암호화진행하

    // 비번 암호화시키기
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next()
      })
    })
  } else {
    next()
  }

});

userSchema.methods.comparePassword = function (plainPassword, cb) {

  // 이미 암호화된 해싱비번은 복호화를 할 수 없으니 입력된 비번을 또 암호화해서 암호회되서 DB에 저장된 해싱비번과 같은지 확인해야함
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
      cb(null, isMatch)

  })
}

userSchema.methods.generateToken = function(cb) {
  const user = this;

  //jsonwebtoken이용해서 토큰생성하기

  let token = jwt.sign(user._id.toHexString(), 'secretToken')

  user.token = token
  user.save(function(err,user) {
    if(err) return cb(err)
    cb(null, user)
  })
}

const User = mongoose.model('User', userSchema);
module.exports = {User};