const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // 다운받았던 bcrypt 가져오기
const saltRounds = 10;

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
    type: Number,
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
// userSchema.pre('save', function (next) {
//   const user = this;
//
//   if (user.isModified('password')) { // 비번이 수정될때만 암호화진행하
//     // 비번 암호화시키기
//     bcrypt.genSalt(saltRounds, function (err, salt) {
//       if (err) return next(err);
//
//       bcrypt.hash(user.password, salt, function (err, hash) {
//         if (err) return next(err);
//         user.password = hash;
//         next()
//       })
//     })
//   }
//
// });

const User = mongoose.model('User', userSchema);
module.exports = {User};