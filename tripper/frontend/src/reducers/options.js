import { SWITCH_TAB, CONFIRMATION } from "../actions/types";

const initialState = {
    tab: "for_user",
    show: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SWITCH_TAB:
            return { ...state, tab: action.payload }
        case CONFIRMATION:
            return { ...state, show: action.payload }
        default:
            return state
    }
}