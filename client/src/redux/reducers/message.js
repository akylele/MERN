import {
    SEND_MESSAGE,
    CLEAR_MESSAGE
} from '../constans'

const initialState = {
    message: '',
}

export default function message(state = initialState, action) {
    switch (action.type) {
        case SEND_MESSAGE:
            return {
                message: action.message
            }
        case CLEAR_MESSAGE:
            return {
                message: null
            }
        default:
            return state
    }
}