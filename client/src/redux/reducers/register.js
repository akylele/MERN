import {
    FETCH_REGISTER_START, FETCH_REGISTER_SUCCESS, FETCH_REGISTER_ERROR
} from '../constans'

const initialState = {
    loading: false,
    message: null,
}

export default function register(state = initialState, action) {
    switch (action.type) {
        case FETCH_REGISTER_START:
            return {
                message: null,
                loading: true
            }
        case FETCH_REGISTER_SUCCESS:
            return {
                loading: false,
            }
        case FETCH_REGISTER_ERROR:
            return {
                message: action.error,
                loading: false,
            }
        default:
            return state
    }
}