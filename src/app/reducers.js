import { combineReducers } from 'redux';
// import documentos from './containers/Documentos/documentosReducer';

// console.log('documentos', documentos);


const initialState = Map({
    counter: 0,
    asyncLoading: false,
    asyncError: null,
    asyncData: null,
});

const documentos = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.BUSCA_DOCUMENTOS:
            return {...state, dadosAnaliticoProcessos: action.payload};
    }

    return state;

};

export default combineReducers({
    // documentos,
});
