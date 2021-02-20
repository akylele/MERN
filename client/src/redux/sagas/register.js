import {fork, put, takeLatest, call} from 'redux-saga/effects'

import {fetchRegisterSuccess, fetchRegisterError} from "../actions/register";
import {FETCH_REGISTER_START} from "../constans";
import {register} from "../../api/register";
import {sendMessage} from "../actions/message";

function* fetchRegister(data) {
    try {
        const response = yield call(register, data.payload)
        yield put(fetchRegisterSuccess());
        yield put(sendMessage(response.data.message))
    } catch (e) {
        yield put(sendMessage(e.response.data.message))
        yield put(fetchRegisterError(e.response.data.message));
    }
}

function* registerWatcher() {
    yield takeLatest(FETCH_REGISTER_START, fetchRegister);
}

export default function* registerSaga() {
    yield fork(registerWatcher)
}
