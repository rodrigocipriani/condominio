import {actionTypes} from './autenticacaoActionTypes';
import Auth from './Auth';

const initialState = {
    usuario: null
};
const actionsMap = {

    [actionTypes.REQ_LOGGED_USER_SUCCESS]: (state, action) => {
        console.log('actionTypes.REQ_LOGGED_USER_SUCCESS', action);

        return {...state, usuario: action.payload};
    },

    [actionTypes.SIGNIN_SUCCESS]: (state, action) => {
        console.log('actionTypes.SIGNIN_SUCCESS', action);
        // save the token
        Auth.authenticateUser(action.payload);

        return {...state};
    },

};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}

