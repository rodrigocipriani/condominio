import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import AppPage from './AppPage';
import * as autenticacaoAction from '../Autenticacao/autenticacaoAction';

class App extends Component {

    constructor(props){
        super(props);
        console.log('isLogged', props.isLogged);
        if (!props.isLogged) {
            props.resquestLoggedUser();
        }
    }

    render() {
        const {usuario} = this.props;
        console.log(usuario);
        if(usuario){
            console.log('entrou');
        }else{
            console.log('não entrou');
        }
        return usuario ? <AppPage {...this.props} /> : <div>loading...</div>;

    }
}

const mapStateToProps = (state) => {
    return {
        documentos: state.documentosReducer.documentos,
        isLogged: state.autenticacaoReducer.isLogged,
        usuario: state.autenticacaoReducer.usuario
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        resquestLoggedUser: () => autenticacaoAction.resquestLoggedUser()
    };
};

export default App = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
