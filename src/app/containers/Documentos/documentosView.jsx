import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import * as documentosAction from './documentosAction';
import Painel from 'rc-react-elements/Painel';

//Tirar daqui
const estatuto = '/static/files/minuta-estatuto-associacao-dos-promitentes-compradores-do-residencial-conteporaneo-05-02-2016.pdf';
const vistoria = '/static/files/Vistoria_20160119_v01.pdf';

@connect(state => ({
    // counter: state.app.get('counter'),
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
        const {} = this.props;

        return (
            <div className='Documentos row'>
                <h2>Documentos</h2>
                <hr />

                <Painel titulo="Gerais" isOpen={true}>
                    <ul className="collection">
                        <li className="collection-item">
                            <small>(Desatualizado)</small>
                            MINUTA ESTATUTO ASSOCIAÇÃO DOS PROMITENTES COMPRADORES DO RESIDENCIAL CONTEMPORÂNEO
                            (Exemplo)
                            <a href={estatuto} target="_blank" className="secondary-content">
                                <i className="fa fa-lg fa-download" aria-hidden="true"></i>
                            </a>
                        </li>
                        <li className="collection-item">
                            <div>
                                <small>(Desatualizado)</small>
                                Vistoria
                                <a href={vistoria} target="_blank" className="secondary-content">
                                    <i className="fa fa-lg fa-download" aria-hidden="true"></i>
                                </a>
                            </div>
                        </li>
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
