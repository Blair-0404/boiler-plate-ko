// node, expressJS 다운 후 expressJS 사용해서 간단한 어플 만들어봄

const express = require('express'); // express가져오기
const app = express(); // 함수이용해 새로운app만들고
const port = 5000; // 어떤 숫자도 괜찮다. 나는 5000으로 설정
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser'); // npm install한 cookie parser를 require시켜주기
const config = require('./config/key');

const {User} = require("./models/User");


// application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser()); // app에서 쿠키파서 사용가능하게 연결?해주기

const mongoose = require('mongoose');
mongoose.connect(config.mongoURI, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
})
  .then(() => console.log('몽고디비 연결성공'))
  .catch(err => console.log(err))

app.get('/', (req, res) => res.send('Hello World! 블레ㅇ입니다....')); // '/'인 즉 루트 디렉토리에 오면 헬로월드 출력하게해주는 부분

app.post('/register', (req, res) => {

  // 회원가입시 필요한 정보들을 클라이언트에서 가져오면 그것을들 DB에 넣어준다.
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) {
      // console.log(err);
      return res.json({success: false, err});
    }
    return res.status(200).json({
      success: true
    })
  })
})

app.post('/login', (req, res) => {

  // 요청된 이메일을 데이터베이스에서 있는지 찾기
  User.findOne({email: req.body.email}, (err, user) => {

    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    // 요청된 이메일이 데이터 베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인.
    user.comparePassword(req.body.password, (err, isMatch) => {

      if (!isMatch)
        return res.json({loginSuccess: false, message: "비밀번호가 틀렸습니다."})

      // 비밀번호까지 맞다면 토근을 생성하기
      user.generateToken((err, user) => {
        if(err) return res.status(400).send(err);

        // 토큰을 저장한다.어디에? 쿠키?로컬스토리지에?등등 가능 ( 여기서는 쿠키에 저장하기로 함)
        res.cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess:true, userId: user._id })

     })
    })
  })
})


app.listen(port, () => console.log(`Example app listening on port${port}!!`));
// 위에서 설정한 포트번호에서 이 app을 실행하기