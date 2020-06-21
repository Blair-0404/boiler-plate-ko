import axios from 'axios';
import { LOGIN_USER } from "./types"

export function loginUser(dataToSubmit) {

  const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data )

  return { // request를 리듀서에 넘겨주는 부분
    type: LOGIN_USER,
    payload: request
  }
}