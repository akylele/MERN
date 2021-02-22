import {fork, put, takeLatest, call, select} from 'redux-saga/effects'

import {
    fetchEditProfileSuccess,
    fetchLoginError,
    fetchLoginSuccess,
    fetchLogoutError,
    fetchLogoutSuccess
} from "../actions/auth";
import {FETCH_EDIT_PROFILE_START, FETCH_LOGIN_START, FETCH_LOGOUT_START} from "../constans";
import {edit, login} from "../../api/auth";
import {sendMessage} from "../actions/message";
import {deleteCookie, getCookie, setCookie} from "../../hooks/cookie";

function* fetchLogin(data) {
    try {
        const response = yield call(login, data.payload)
        yield put(fetchLoginSuccess(response.data));
        localStorage.setItem('profile', JSON.stringify(response.data))
        yield put(sendMessage(response.data.message))
        setCookie('token', response.data.token)
        setCookie('userId', response.data.userId)
        // window.location.reload()

    } catch (e) {
        yield put(sendMessage(e.response.data.message))
        yield put(fetchLoginError(e.response.data.message));
    }
}

function* fetchLogout() {
    try {
        deleteCookie('token')
        deleteCookie('userId')
        localStorage.removeItem('profile')
        yield put(fetchLogoutSuccess());
        window.location.reload()
    } catch (e) {
        yield put(fetchLogoutError('не удалось выйти'));
    }
}

function* fetchEdit(data) {
    const userId = yield select(store => store.authReducer.profile.id)
    try {
        const response = yield call(edit, {
            ...data.payload,
            id: userId
        })
        localStorage.setItem('profile', JSON.stringify(response.data))
        yield put(fetchEditProfileSuccess(response.data));
    } catch (e) {
        yield put(fetchLogoutError('не удалось изменить'));
    }
}

function* loginWatcher() {
    yield takeLatest(FETCH_LOGIN_START, fetchLogin);
}

function* logoutWatcher() {
    yield takeLatest(FETCH_LOGOUT_START, fetchLogout);
}

function* editWatcher() {
    yield takeLatest(FETCH_EDIT_PROFILE_START, fetchEdit);
}

export default function* authSaga() {
    yield fork(loginWatcher)
    yield fork(logoutWatcher)
    yield fork(editWatcher)
}
