import {
    FETCH_LOGIN_START,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR,
    FETCH_LOGOUT_ERROR,
    FETCH_LOGOUT_START,
    FETCH_LOGOUT_SUCCESS,
} from '../constans'

export const fetchLoginStart = (form) => ({
    type: FETCH_LOGIN_START,
    payload: form
})
export const fetchLoginSuccess = (payload) => ({
    type: FETCH_LOGIN_SUCCESS,
    payload
})
export const fetchLoginError = (error) => ({
    type: FETCH_LOGIN_ERROR,
    error
})
export const fetchLogoutStart = () => ({
    type: FETCH_LOGOUT_START,
})
export const fetchLogoutSuccess = (payload) => ({
    type: FETCH_LOGOUT_SUCCESS,
    payload
})
export const fetchLogoutError = (error) => ({
    type: FETCH_LOGOUT_ERROR,
    error
})
