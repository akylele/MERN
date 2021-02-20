import {fork, put, takeLatest} from 'redux-saga/effects'

import {CLEAR_MESSAGE, SEND_MESSAGE} from "../constans";
import {sendMessage as SEND, clearMessage as CLEAR} from '../actions/message'

function* sendMessage(data) {
    try {
        yield put(SEND, data.message)
    } catch (e) {

    }
}

function* clearMessage() {
    try {
        yield put(CLEAR)
    } catch (e) {

    }
}

function* clearMessageWatcher() {
    yield takeLatest(CLEAR_MESSAGE, clearMessage);
}

function* sendMessageWatcher() {
    yield takeLatest(SEND_MESSAGE, sendMessage);
}

export default function* messageSaga() {
    yield fork(clearMessageWatcher)
    yield fork(sendMessageWatcher)
}
