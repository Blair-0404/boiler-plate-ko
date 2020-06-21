## Server
### register, login, auth, logout - boilerPlate

***
 
## Client
### client내부경로로 들어와서 npx create-react-app . 로 앱생
* 뒤에 .의 의미는 현재 경로안에 설치하겠다는 의미
* npm 이 아닌 npx로 다운받는 이유 : 
    * npm(Node Package Manager)은 저장소 역할을 한다. npm에 관한것은 package.json에 다 나와있다.
    * 다운받을 시 -g를 붙여주면 컴퓨터 안에 저장이 되는 것 이다.
    * npx는 다운받기보단 가져와서 쓸 수 있는 것 이다. disk space 낭비가 덜하고 항상 최신버전을 사용할 수 있는 장점이 있다.

### webpack은 public directory는 관리를 하지 않는다 src만 관리한다.