import {documentosActionTypes} from './documentosAction';

const initialState = {
    documentos: []
};

const actionsMap = {

    [documentosActionTypes.BUSCA_DOCUMENTOS_SUCCESS]: (state, action) => {

        return {...state, documentos: action.payload};
    },
};

export default function reducer(state = initialState, action = {}) {
    const fn = actionsMap[action.type];
    return fn ? fn(state, action) : state;
}

