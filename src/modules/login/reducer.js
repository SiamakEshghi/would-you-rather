import * as t from './actionTypes';

const INITIAL_STATE = { logged: false }

const loginReducer = (state={INITIAL_STATE}, action) => {
    
    switch (action.type) {
        case t.LOG_IN:
            return {...state, logged: action.logged }
        case t.LOG_OUT:
            return INITIAL_STATE;
        default:
            return state;
    }
}
export default loginReducer;