import { 
    SHOW_REGISTER, 
    SHOW_LOGIN, 
    USER_LOADING,
    USER_LOADED, 
    AUTH_ERROR, 
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL
} from "./types";

import axios from 'axios'
import { createAlert, returnErrors } from "./alerts";

export const showRegister = (toggle) => dispatch => {
    dispatch({
        type: SHOW_REGISTER,
        payload: toggle
    }) 
}

export const showLogin = (toggle) => dispatch => {
    dispatch({
        type: SHOW_LOGIN,
        payload: toggle
    })
}

export const loadUser = () => (dispatch, getState)=> {
    dispatch({
        type: USER_LOADING
    })
    axios.get('/auth/user', tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: USER_LOADED,
                payload: res.data
            })
        }).catch(error => {
            // dispatch(returnErrors(error.response.data, error.response.status))
            dispatch({
                type: AUTH_ERROR
            })
        })
}

export const login = (username, password) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    // Request Body
    const body = JSON.stringify({ username, password })
    try {
        const res = await axios.post('auth/login', body, config)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        return true
    } catch (error) {
        const message = {
            detail: error.response.data.non_field_errors[0]
        }
        dispatch(returnErrors(message, error.response.status))
        dispatch({
            type: LOGIN_FAIL
        })
        return false
    }
}

export const logout = () => (dispatch, getState) => {
    axios.post('auth/logout', null, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: LOGOUT_SUCCESS
        })
    }).catch(error => {
        dispatch(returnErrors(error.response.data, error.response.status))
    })
}

export const register = (username, password, confirmation, email ) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if (confirmation !== password) {
        const message = {
            detail: "Password's do not match!"
        }
        dispatch(returnErrors(message, 403))

        return null
    }

    // Request Body
    const body = JSON.stringify({ username, password, email })
    try {
        const res = await axios.post('/auth/register', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        })
        return true
    } catch (error) {
        const message = {
            detail: error.response.data.username[0]
        }
        dispatch(returnErrors(message, error.response.status))
        dispatch({
            type: REGISTER_FAIL
        })
        return false
    }
    // .then(res => {
    //     dispatch({
    //         type: REGISTER_SUCCESS,
    //         payload: res.data
    //     })
    // }).catch(error => {
    //     const message = {
    //         detail: error.response.data.username[0]
    //     }
    //     dispatch(returnErrors(message, error.response.status))
    //     dispatch({
    //         type: REGISTER_FAIL
    //     })
    // })
}

export const tokenConfig = (getState) => {
    const token = getState().auth.token
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    if(token) {
        config.headers['Authorization'] = `Token ${token}`
    }

    return config
}