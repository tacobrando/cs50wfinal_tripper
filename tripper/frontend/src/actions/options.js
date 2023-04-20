import { SWITCH_TAB, CONFIRMATION } from "./types";
import { createAlert, returnErrors } from './alerts'

export const switchTab = tab => dispatch => {
    dispatch({
        type: SWITCH_TAB,
        payload: tab
    })
}

export const confirmation = show => dispatch => {
    dispatch({
        type: CONFIRMATION,
        payload: show
    })
}