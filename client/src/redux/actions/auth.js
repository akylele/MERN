import {
    FETCH_LOGIN_START,
    FETCH_LOGIN_SUCCESS,
    FETCH_LOGIN_ERROR,
    FETCH_LOGOUT_ERROR,
    FETCH_LOGOUT_START,
    FETCH_LOGOUT_SUCCESS, FETCH_EDIT_PROFILE_START, FETCH_EDIT_PROFILE_SUCCESS, FETCH_EDIT_PROFILE_ERROR,
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
export const fetchLogoutSuccess = () => ({
    type: FETCH_LOGOUT_SUCCESS,
})
export const fetchLogoutError = (error) => ({
    type: FETCH_LOGOUT_ERROR,
    error
})

export const fetchEditProfileStart = (form) => ({
    type: FETCH_EDIT_PROFILE_START,
    payload: form
})
export const fetchEditProfileSuccess = (payload) => ({
    type: FETCH_EDIT_PROFILE_SUCCESS,
    payload
})
export const fetchEditProfileError = (error) => ({
    type: FETCH_EDIT_PROFILE_ERROR,
    error
})
