import axios from 'axios';
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types"

export function loginUser(dataToSubmit) {

  const request = axios.post('/api/users/login', dataToSubmit)
    .then(response => response.data);

  return { // request를 리듀서에 넘겨주는 부분
    type: LOGIN_USER,
    payload: request
  }

}

export function registerUser(dataToSubmit) {

  const request = axios.post('/api/users/register', dataToSubmit)
    .then(response => response.data);

  return { // request 를 리듀서에 넘겨주는 부분
    type: REGISTER_USER,
    payload: request
  }


}

export function auth() {

  const request = axios.get('/api/users/auth')
    .then(response => response.data);

  return { // request 를 리듀서에 넘겨주는 부분
    type: AUTH_USER,
    payload: request
  }
}