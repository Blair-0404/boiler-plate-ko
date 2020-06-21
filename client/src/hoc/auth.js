import React, {useEffect} from "react";
import Axios from 'axios';
import {useDispatch} from 'react-redux'
import {auth} from '../_actions/user_action'

export default function (SpecificComponent, option, adminRoute = null) {

  function AuthenticationCheck(props) {

    // option 종류들
    // null (아무나 출입 가능한 페이지)
    // true (로그인한 유저만 출입가능)
    // false (로그인한 유저는 출입불가)

    const dispatch = useDispatch();

    useEffect(() => {

      dispatch(auth()).then(response => {
        console.log(response)

        // 로그린 하지 않은 상태
        if (!response.payload.isAuth) {
          if (option) {
            props.history.push('/login')
          }
        } else {
          // 로그인 한 상태
          if (adminRoute && !response.payload.isAuth) {
            props.history.push('/')
          } else {
            if (!option) {
              props.history.push('/')
            }
          }
        }
      })

      // Axios.get('/api/users/auth')
    }, [])

    return (
      <SpecificComponent/>
    )
  }


  return AuthenticationCheck
}