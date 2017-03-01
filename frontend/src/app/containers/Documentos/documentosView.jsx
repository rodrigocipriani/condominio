import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as documentosAction from './documentosAction';
import Painel from 'rc-react-elements/Painel';

//Tirar daqui
const estatuto = '/static/files/minuta-estatuto-associacao-dos-promitentes-compradores-do-residencial-conteporaneo-05-02-2016.pdf';
const vistoria = '/static/files/Vistoria_20160119_v01.pdf';
const ata = '/static/files/ata_fundacao-ass_prom_guilherme_almeida-2017-02-14.docx';

@connect(state => ({
    documentos: state.documentos.documentos,
}))
class Documentos extends Component {

    static propTypes = {
        // from react-redux connect
        dispatch: PropTypes.func,
    };

    static routeWillInit = (nextState, replace, callback) => {
        documentosAction.buscaDocumentos();
        callback();
    };

    constructor() {
        super();
    }

    render() {
        const {documentos} = this.props;
        console.log('documentos', documentos);

        return (
            <div className='Documentos row'>
                <h2>Documentos</h2>
                <hr />

                <Painel titulo="Gerais" isOpen={true}>
                    <ul className="collection">
                        {documentos.map(documento => {
                            return (
                                <li className="collection-item">
                                    {documento.titulo}
                                    <a href={documento.url} target="_blank" className="secondary-content">
                                        <i className="fa fa-lg fa-download" aria-hidden="true" />
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </Painel>
            </div>
        );
    }
}

// Documentos.routeInit = (nextState, replace, callback) => {
//     console.debug('init app!', this.props);
//     // store.dispatch(setDadosContextoFrente(paramsProcessos));
//     callback();
// };

export default Documentos;
