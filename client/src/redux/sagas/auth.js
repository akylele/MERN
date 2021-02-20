import {fork, put, takeLatest, call} from 'redux-saga/effects'

import {fetchLoginError, fetchLoginSuccess} from "../actions/auth";
import {FETCH_LOGIN_START} from "../constans";
import {login} from "../../api/auth";
import {sendMessage} from "../actions/message";

function* fetchUser(data) {
    try {
        const response = yield call(login, data.payload)
        yield put(fetchLoginSuccess(response));
        yield put(sendMessage(response.data.message))
    } catch (e) {
        yield put(sendMessage(e.response.data.message))
        yield put(fetchLoginError(e.response.data.message));
    }
}

function* authWatcher() {
    yield takeLatest(FETCH_LOGIN_START, fetchUser);
}

export default function* authSaga() {
    yield fork(authWatcher)
}
