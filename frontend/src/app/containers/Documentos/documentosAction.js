import {createAssyncAction} from '../../lib/actionsHelper';
import api  from 'lib/api';
import config from '../../config';

const appApi = api(config.urls.api);

export const documentosActionTypes = {
    BUSCA_DOCUMENTOS: 'BUSCA_DOCUMENTOS',
    BUSCA_DOCUMENTOS_START: 'BUSCA_DOCUMENTOS_START',
    BUSCA_DOCUMENTOS_ERROR: 'BUSCA_DOCUMENTOS_ERROR',
    BUSCA_DOCUMENTOS_SUCCESS: 'BUSCA_DOCUMENTOS_SUCCESS'
};

export function buscaDocumentos() {
    createAssyncAction(documentosActionTypes.BUSCA_DOCUMENTOS,
        appApi.get('/documentos'),
        {}
    );
}
