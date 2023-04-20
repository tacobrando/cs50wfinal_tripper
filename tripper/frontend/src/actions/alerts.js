import { CREATE_ALERT, GET_ERRORS } from './types'

export const createAlert = alert => {
    return {
        type: CREATE_ALERT,
        payload: alert
    }
}

export const returnErrors = (message, status) => {
    return {
        type: GET_ERRORS,
        payload: { message, status }
    }
}