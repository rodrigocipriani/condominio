import {Map} from 'immutable';
import {actionTypes} from './documentosActionTypes';

const initialState = Map({
    counter: 0
});

const actionsMap = {
    [actionTypes.BUSCA_DOCUMENTOS]: (state) => {
        console.log('actionTypes.BUSCA_DOCUMENTOS');

        const counter = state.get('counter') + 1;

        return state.merge({
            counter,
        });
    },

    // Async action
    [actionTypes.BUSCA_DOCUMENTOS_START]: (state) => {
        console.log('actionTypes.BUSCA_DOCUMENTOS_START');
        return state.merge({
            asyncLoading: true,
            asyncError: null,
        });
    },
    [actionTypes.BUSCA_DOCUMENTOS_ERROR]: (state, action) => {
        console.log('actionTypes.BUSCA_DOCUMENTOS_ERROR');
        return state.merge({
            asyncLoading: false,
            asyncError: action.data,
        });
    },
    [actionTypes.BUSCA_DOCUMENTOS_SUCCESS]: (state, action) => {
        console.log('actionTypes.BUSCA_DOCUMENTOS_SUCCESS');
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

