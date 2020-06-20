// node, expressJS 다운 후 expressJS 사용해서 간단한 어플 만들어봄

const express = require('express') // express가져오기
const app = express() // 함수이용해 새로운app만들고
const port = 5000 // 어떤 숫자도 괜찮다. 나는 5000으로 설정

app.get('/', (req, res) => res.send('Hello World!블레어 :>')) // '/'인 즉 루트 디렉토리에 오면 헬로월드 출력하게해주는 부분

app.listen(port, () => console.log(`Example app listening on port${port}!!`))
// 위에서 설정한 포트번호에서 이 app을 실행하기

//설치한 몽구스를 이용해서 몽고디비와 연결하기
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://blair:kong2kong2@@boilerplate-xabki.mongodb.net/test?retryWrites=true&w=majority',{
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false}).then(() => console.log('몽고디비 연결성공'))
  .catch(err => console.log(err))




