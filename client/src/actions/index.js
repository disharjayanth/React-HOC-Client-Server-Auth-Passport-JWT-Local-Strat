import { AUTH_USER, AUTH_ERROR } from './types'
import axios from 'axios'

export const signup = ({ email, password }, callback) => async dispatch => {   //in simple THIS IS REDUX THINK it returns a function with dispatch function (type: *always important*, payload) and can return as many as dispatch function required
    
    try {
        const response = await axios.post('http://localhost:3090/signup', {
        email: email,
        password: password
      })

      dispatch({
        type: AUTH_USER,
        payload: response.data.token
      })

      localStorage.setItem('token', response.data.token)
      callback()

    } catch(err) {
        dispatch({
            type: AUTH_ERROR,
            payload: 'Email in use.'
        })
    }
}

export const signin = ({ email, password }, callback) => async dispatch => {   //in simple THIS IS REDUX THINK it returns a function with dispatch function (type: *always important*, payload) and can return as many as dispatch function required
    
  try {
      const response = await axios.post('http://localhost:3090/signin', {
      email: email,
      password: password
    })

    dispatch({
      type: AUTH_USER,
      payload: response.data.token
    })

    localStorage.setItem('token', response.data.token)
    callback()

  } catch(err) {
      dispatch({
          type: AUTH_ERROR,
          payload: 'Invalid login credentials.'
      })
  }
}

export const signout = () => {
  localStorage.removeItem('token')

  return {
    type: AUTH_USER,
    payload: ''
  }
}
