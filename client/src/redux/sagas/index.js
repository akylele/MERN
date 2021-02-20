import { all } from 'redux-saga/effects'

import authWatcher from './auth'
import registerWatcher from './register'
import messageWatcher from './message'

function* rootSaga() {
    yield all([
        authWatcher(),
        messageWatcher(),
        registerWatcher()
    ])
}

export default rootSaga;