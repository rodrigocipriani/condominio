import {indexActionTypes} from './indexActionTypes';

const initialState = {
    msgs: []
};

const actionsMap = {

    [indexActionTypes.APP_NEW_MESSAGE]: (state, action) => {

        let mensagens = action.error.response.data.mensagens;
        let errors = mensagens || [];

        return {...state, msgs: errors};
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = action.type.endsWith('_ERROR') ? actionsMap[indexActionTypes.APP_NEW_MESSAGE] : actionsMap[action.type];
    return fn ? fn(state, action) : state;
}

