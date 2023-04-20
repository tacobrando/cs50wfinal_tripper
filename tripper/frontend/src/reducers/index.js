import { combineReducers } from "redux";
import posts from './posts'
import errors from './errors'
import alerts from './alerts'
import auth from './auth'
import options from './options'

export default combineReducers({
    posts,
    errors,
    alerts,
    auth,
    options
})