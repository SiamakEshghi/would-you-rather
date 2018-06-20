import * as data from '../../utils/Data'
import * as t from './actionTypes';

export const loginUser= (value, callBack) => {
    return dispatch => {
        dispatch({ type: t.LOG_IN, logged: value !== '' });
    }
}
export const logOut = () => {
    return {
        type: t.LOG_OUT
    }
}