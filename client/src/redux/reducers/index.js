import { combineReducers } from 'redux'

import authReducer from './auth';
import messageReducer from './message';
import registerReducer from './register';

export default combineReducers({
    messageReducer,
    authReducer,
    registerReducer
})