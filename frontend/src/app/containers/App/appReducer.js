import {appActionTypes} from './appActionTypes';

const initialState = {
    msgs: []
};

const actionsMap = {

    [appActionTypes.APP_NEW_MESSAGE]: (state, action) => {

        let mensagens = action.error.response.data.mensagens;
        let errors = mensagens || [];

        return {...state, msgs: errors};
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = action.type.endsWith('_ERROR') ? actionsMap[appActionTypes.APP_NEW_MESSAGE] : actionsMap[action.type];
    return fn ? fn(state, action) : state;
}

