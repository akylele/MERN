import {
    FETCH_LOGIN_START,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR,
    FETCH_LOGOUT_ERROR,
    FETCH_LOGOUT_START,
    FETCH_LOGOUT_SUCCESS
} from '../constans'
import {getCookie} from "../../hooks/cookie";

const profile = JSON.parse(localStorage.getItem('profile'))

const initialState = {
    loading: false,
    error: null,
    profile: {
        token: getCookie('token') || null,
        userId: profile ? profile.userId : '',
        name: profile ? profile.name : '',
        surname: profile ? profile.surname : '',
        age: profile ? profile.age : '',
        phone: profile ? profile.phone : '',
        email: profile ? profile.email : '',
        birthday: profile ? profile.birthday : ''
    }
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case FETCH_LOGIN_START:
            return {
                ...state,
                error: null,
                loading: true
            }
        case FETCH_LOGIN_SUCCESS:
            return {
                ...state,
                error: null,
                loading: false,
                profile: action.payload
            }
        case FETCH_LOGIN_ERROR:
            return {
                error: action.error,
                loading: false,
                profile: initialState.profile
            }
        case FETCH_LOGOUT_START:
            return {
                ...state,
                loading: true
            }
        case FETCH_LOGOUT_SUCCESS:
            return initialState
        case FETCH_LOGOUT_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}