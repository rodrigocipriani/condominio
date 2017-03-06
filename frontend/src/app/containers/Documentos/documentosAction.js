import {createAssyncAction} from '../../lib/actionsHelper';
import api  from 'lib/api';
import {actionTypes} from './documentosActionTypes';
import config from '../../config';

const apiGeral = api(config.urls.api);

export function buscaDocumentos() {
    createAssyncAction(actionTypes.BUSCA_DOCUMENTOS,
        apiGeral.get('/documentos'),
        {}
    );
}
