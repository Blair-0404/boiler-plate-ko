import React, { useEffect } from "react";
import axios from 'axios';

function LandingPage() {

  useEffect(() => { // 랜딩페이지에 들어오자마자 이 부분을 실행
      axios.get('/api/hello')
      .then(response => {console.log(response)})
  }, [])

  return (
    <div>
      LandingPage 랜딩페이지
    </div>
  )
}

export default LandingPage