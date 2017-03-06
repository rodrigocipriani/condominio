import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as documentosAction from './documentosAction';
import {Painel} from 'rc-react-elements/layout';

@connect(state => ({
    documentos: state.documentosReducer.documentos,
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

        return (
            <div className='Documentos row'>
                <h3>Documentos</h3>
                <hr />

                <Painel titulo="Gerais" isOpen={true}>
                    <ul className="collection">
                        {documentos.map((documento, key) => {
                            return (
                                <li key={key} className="collection-item">
                                    {documento.titulo}
                                    <a href={documento.url} target="_blank" className="secondary-content">
                                        <i className="fa fa-lg fa-download" aria-hidden="true"/>
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
