# < Server >
## register, login, auth, logout - boilerPlate

***
 
# < Client >
## client내부경로로 들어와서 npx create-react-app . 로 앱생
* 뒤에 .의 의미는 현재 경로안에 설치하겠다는 의미
* npm 이 아닌 npx로 다운받는 이유 : 
    * npm(Node Package Manager)은 저장소 역할을 한다. npm에 관한것은 package.json에 다 나와있다.
    * 다운받을 시 -g를 붙여주면 컴퓨터 안에 저장이 되는 것 이다.
    * npx는 다운받기보단 가져와서 쓸 수 있는 것 이다. disk space 낭비가 덜하고 항상 최신버전을 사용할 수 있는 장점이 있다.

## webpack은 public directory는 관리를 하지 않는다 src만 관리한다.

## src내부에 필요한 폴더들 생성
* _actions, _reducers, components/views/~Pages, hoc, utils 등등 생성 후 초기 셋팅
* component 들은 일단 함수형으로 생성함

## React-Router-Dom새성 후 라우터기능 사용(페이지마다)
* cd client로 경로를 클라이언트 쪽으로 변경해준 후 npm install react-router-dom --save 설치
* App.js 에 페이지마다 라우팅설정

## client에서 요청 보내보기(test) (client영역을 생성하기 전에는 postman에서 요청보냈었다.)
* Axios라이브러리 사용(AJAX 비슷한개?)
    * cd client로 경로를 클라이언트 쪽으로 변경해준 후 npm install axios -- save
    * 설치 후 client의 LandingPage.js와 server의 index.js에서 axios test
    
    
            // client - LandingPage.js
            import React, { useEffect } from "react";
            import axios from 'axios';
            function LandingPage() {
        
            useEffect(() => { // useEffect사용해서 랜딩페이지에 들어오자마자 이 부분을 실행한다는 의미
            axios.get('/api/hello')
              .then(response => console.log(response))
            }, [])
        
              return (
                <div>
                  LandingPage 랜딩페이지
                </div>
              )
            }
            export default LandingPage
        
            // server - index.js
            app.get('/api/hello', (req,res) => {
            
              res.send("안녕하세요 블레어입니다.")
            })
* 서버는 5000 port이고 클라이언트는 3000 port여서 CORS error가 발생함
* Cross-Origin Resource Sharing 해결하려면?
    * 개발자 구를 이용해서 해결할 수 있지만 개발자들만 사용할 수 있어서 제한적이다.
    * 서버와 클라이언트 모두에서 해결해주는 방법이 필요하다.
        * 각각 서버와 클라이언트에서 3000, 5000에서 오는걸 받을 수 있도록 해결할 수 있다.
        * Proxy로 해결하는 방법 도 있다.
        
                1. client경로에 와서 npm install http-proxy-middleware --save 
                2. src 디렉토리에 setupProxy.js파일 생성 후 아래코딩
                
                //setupProxy.js
                
                const proxy = require('http-proxy-middleware');
                
                module.exports = function(app) {
                  app.use(
                    '/api',
                    proxy({
                      target: 'http://localhost:5000',
                      changeOrigin: true,
                    })
                  );
                };
        * 그렇다면 proxy server란? 
        
                - 유저와 인터넷의 통신의 중간에는 proxy server가 있다. 유저의 아이피를 인터넷에서 받을때 프록시서버가 
                임의로 변경할 수 있기 때문에 받는 쪽에서는 실제 IP를 모를 수 있다.!
                - 보내는 데이터도 임의로 바꿀 수 있다.
                - 방화벽 기능
                - 웹 필터기능
                - 캐쉬 데이터, 공유 데이터 제공기
                - 사용이유? 
                    - 회사에서 직원들의 인터넷 사용제어, 집에서 아이들의 인터넷사용 제어
                    - 더 나은 보안제공
                    - 캐쉬를 이용해 더 빠른 인터넷 이용
        
## 서버와 클라이언트르 따로 키지않고 한번에 킬 수 있게 concurrently 라이브러리 사용해보기
* npm install concurrently --save 로 다운
* server- package.json에서  설정

        "scripts"에 아래 추가하기
        "dev" : "concurrently \"npm run backend\" \"npm run start --prefix client\""

## CSS framework 사용해보기
* CSS framework 종류
    * Material-UI
    * React Bootstrap
    * Semantic UI
    * Ant Design 
    * Materialize
### 본 프로젝트에서는 Ant Design 사용!
* 사이즈가 큰 단점이있지만 디자인이 굉장히 심플하고(주관적) 사용하기 편리한 장점이 있다.
* client 경로에 들어가서 npm install antd --save 다운
* client-index.js에 import 'antd/dist/antd.css'; 추가 (impoort시키기)


## 상태관리 - Redux 사용
* Props vs State 차이를 아는가? (보관방법의 차이도 생각하기)
    
        - Props는 부모컴포넌트가 자식 컴포넌트에게 State를 내려주면 자식컴포넌트는 그것을 Props라는 이름으로 받는다. 
          (반드시 부모->자식으로만 전달가능)
        - Props는 한번받으면 immutability함 ! 변하게 하고싶으면 다시 부모에서(변경 후)내려줘야 함
        
        * State는 컴포넌트 안에서 관리가 필요한 데이터 등 이다.
        * State가 들어있는 해당 컴포넌트안에서 변경가능하다.
        * State가 변경되면 저절로 rerendering된다.
        
* 리덕스가 있고 없고의 차이?? 

        - state의 관리를 용이하게 해준다.
        - 리덕스가 없으면 가장 상위의 공간에서 상태들을 관리해서 컴포넌트마다 타고 올라가야하지만
          리덕스가 있으면 별도의 store라는 공간이 생기고 그 안에서 store값들을 관리하므로 모든 컴포넌드들에서 
          한번에 접근이 가능하다.(딘계별로 전달하고 전달받을 필요가 없다.)
        - flow 흐름 이해하기 dispatch-action-reducer(변한 state를 리턴)-store
        
* Redux setting
    * client 에서 필요한 네가지 한번에 다운 - npm install redux react-redux redux-promise redux-thunk --save
        
* redux-promise redux-thunk 두가지(redux middleware)는 리덕스를 잘 쓸수있게해주는 역할을 한다. 어떻게??
    
    
    * 리덕스 스토어 안의 값을 변경하려면 dispatch로만 가능하고 - 액션이 발생하면 객체를 반환하고 - 리덕스 store는 객체형식만 받는다.
    * 하지만 function형식으로 올수도있고 propmise로 올수도 있고 그렇게되면 리덕스 store는 받지 못한다. 그래서!
        * redux-thunk : dispatch에게 function을 받는 방법을 알려준다.
        * redux-promise : dispatch에게 promise가 왔을때는 어떻게 대처해야하는지를 알려준다.
        * 즉 이 둘을 없이 사용하면 에러가 많이 날 수 있다.
        
* 다운받은 것들 적용시키기
    * App.js에서 Provider로 App감싸주기, createstore, applyMiddleware coding
    * _reducers에 index.js만든 후 combineReducers import후 rootReducer생성 
    * Redux Extension 적용
          
* store에는 여러개의 reducer들이 있을 수 있다. (reducer는 store의 값을 변화시킨다.) -> 여러 리듀서들을 rootReducer로 합친다.