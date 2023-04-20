import { GET_POSTS, DELETE_POST, ADD_POST } from "./types";
import { createAlert, returnErrors } from './alerts'

import axios from 'axios'
// GET POSTS
export const getPosts = () => dispatch => {
    axios.get('/posts')
    .then(res => {
        dispatch({
            type: GET_POSTS,
            payload: res.data
        })
    })
    .catch((error) => dispatch(returnErrors(error.response.data, error.response.status)))
}

//DELETE POST
export const deletePost = (id) => (dispatch, getState) => {
    axios.delete(`/posts/${id}`, tokenConfig(getState))
    .then(res => {
        dispatch({
            type: DELETE_POST,
            payload: id
        })
    })  
    .catch((error) => dispatch(returnErrors(error.response.data, error.response.status)))
}

//ADD POST
export const addPost = (post) => (dispatch, getState) => {
    axios.post("/posts/", post, tokenConfig(getState))
    .then(res => {
        dispatch(createAlert({ addPost: "Post Added" }))
        dispatch({
            type: ADD_POST,
            payload: res.data
        })
    })
    .catch((error) => dispatch(returnErrors(error.response.data, error.response.status)))
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