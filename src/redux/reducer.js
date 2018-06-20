import { combineReducers } from 'redux';
import loginReducer from '../modules/login/reducer';
import publicReducer from '../Public/reducer';

export default combineReducers ({
    log: loginReducer,
    pub: publicReducer,
})