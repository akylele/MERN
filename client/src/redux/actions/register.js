import {FETCH_REGISTER_ERROR, FETCH_REGISTER_START, FETCH_REGISTER_SUCCESS} from "../constans";

export const fetchRegisterStart = (form) => ({
    type: FETCH_REGISTER_START,
    payload: form
})
export const fetchRegisterSuccess = () => ({
    type: FETCH_REGISTER_SUCCESS,
})
export const fetchRegisterError = (error) => ({
    type: FETCH_REGISTER_ERROR,
    error
})