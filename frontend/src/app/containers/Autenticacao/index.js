import React, {PureComponent, PropTypes} from 'react';
import {connect} from 'react-redux'
import {routeCodes} from '../../routes';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import * as autenticacaoAction from './autenticacaoAction';

class Autenticacao extends PureComponent {

    render(){

        const {page, isLogged, signIn, signUp, signOut} = this.props;

        if(page === 'logout') {
            signOut();
            // todo : location... mexe com o navegador, trocar para algo nativo do react
            location.href = routeCodes.LOGIN;
        }

        const pages = [];
        pages['login'] = <LoginPage isLogged={isLogged} handleSignIn={signIn} routeCodes={routeCodes}/>;
        pages['signup'] = <SignUpPage isLogged={isLogged} handleSignUp={signUp} routeCodes={routeCodes}/>;
        pages['logout'] = <div>Saindo...</div>;

        return pages[page] || <div>Página não encontrada</div>;
    }

}

Autenticacao.propTypes = {
    page: PropTypes.string.isRequired
};

Autenticacao.defaultProps = {
    page: false
};

const mapStateToProps = (state) => {
    return {
        isLogged: state.autenticacaoReducer.isLogged,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (email, password) => autenticacaoAction.signIn(email, password),
        signUp: (email, password) => autenticacaoAction.signUp(name, email, password),
        signOut: (email, password) => autenticacaoAction.signOut()
    };
};

export default Autenticacao = connect(
    mapStateToProps,
    mapDispatchToProps
)(Autenticacao);
