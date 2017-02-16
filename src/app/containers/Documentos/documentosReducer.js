import {Map} from 'immutable';

import {actionTypes} from './documentosAction';

const initialState = Map({
    counter: 0,
    asyncLoading: false,
    asyncError: null,
    asyncData: null,
});

const actionsMap = {
    [actionTypes.BUSCA_DOCUMENTOS]: (state) => {
        const counter = state.get('counter') + 1;

        return state.merge({
            counter,
        });
    },

    // Async action
    [actionTypes.BUSCA_DOCUMENTOS_START]: (state) => {
        return state.merge({
            asyncLoading: true,
            asyncError: null,
        });
    },
    [actionTypes.BUSCA_DOCUMENTOS_ERROR]: (state, action) => {
        return state.merge({
            asyncLoading: false,
            asyncError: action.data,
        });
    },
    [actionTypes.BUSCA_DOCUMENTOS_SUCCESS]: (state, action) => {
        return state.merge({
            asyncLoading: false,
            asyncData: action.data,
        });
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}
