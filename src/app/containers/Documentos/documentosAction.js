import { createAction } from '../../actionsHelper';
import api  from 'lib/api';

const apiGeral = api.apiGeral;

export const actionTypes = {
    BUSCA_DOCUMENTOS: 'BUSCA_DOCUMENTOS',
    BUSCA_DOCUMENTOS_START: 'BUSCA_DOCUMENTOS_START',
    BUSCA_DOCUMENTOS_ERROR:'BUSCA_DOCUMENTOS_ERROR',
    BUSCA_DOCUMENTOS_SUCCESS: 'BUSCA_DOCUMENTOS_SUCCESS'
};

export const ExeploActionLocal = (tarefa, posicao) => {
    return dispatch => dispatch(
        { type: types.EXPANDE_ETAPAS, tarefa, posicao }
    )
};

const buscaDocumentos = (params, dado, situacaoId) => {
    return createAssyncAction(actionTypes.BUSCA_DOCUMENTOS,
        apiGeral.get('/projeto/relatorio/painelEficiencia/busca/analitico/tarefas', {
                params: {...params, situacaoId: situacaoId}
            }
        ),
        dado
    );
};

// export function testAction() {
//   return {
//     type: TEST_ACTION,
//   };
// }
//
// // Async action example
//
// function testAsyncStart() {
//   return {
//     type: TEST_ASYNC_ACTION_START,
//   };
// }
//
// function testAsyncSuccess(data) {
//   return {
//     type: TEST_ASYNC_ACTION_SUCCESS,
//     data,
//   };
// }
//
// function testAsyncError(error) {
//   return {
//     type: TEST_ASYNC_ACTION_ERROR,
//     error,
//   };
// }

// export function testAsync() {
//   return function (dispatch) {
//     dispatch(testAsyncStart());
//
//     api.testAsync()
//       .then(data => dispatch(testAsyncSuccess(data)))
//       .catch(error => dispatch(testAsyncError(error)));
//   };
// }


// Update
