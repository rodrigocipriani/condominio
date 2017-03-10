import React, {Component} from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';

import config from './config';
const publicPath = config.urls.subApp ? `${config.urls.subApp}/` : `/`;
/**
 * Inportar containers aqui
 * */
import Index from './containers/Index';
import App from './containers/App';
import Autenticacao from './containers/Autenticacao';
import Documentos from './containers/Documentos';
import Forum from './containers/Forum/Index';
import Indicacoes from './containers/Indicacoes/Index';
import NotFound from './containers/NotFound/Index';

/**
 * Comfigurar rotas
 * */
export const routeCodes = {
    HOME: `${ publicPath }`,
    LOGIN: `${ publicPath }login`,
    LOGOUT: `${ publicPath }logout`,
    SIGNUP: `${ publicPath }signup`,
    DOCUMENTOS: `${ publicPath }documentos`,
    FORUM: `${ publicPath }forum`,
    INDICACOES: `${ publicPath }indicacoes`,
};

export default class Routes extends Component {

    render() {

        return (
            <Index callbackNotLogged={
                // todo : location... mexe com o navegador, trocar para algo nativo do react
                {/*() => location.pathname != routeCodes.LOGIN ? location.href = routeCodes.LOGIN : null*/}
            }>
                <Router history={ browserHistory }>

                    <Route path={routeCodes.HOME} component={App}>

                        <IndexRedirect to={routeCodes.DOCUMENTOS}/>

                        <Route path={ routeCodes.DOCUMENTOS } component={ Documentos }/>
                        <Route path={ routeCodes.FORUM } component={ Forum }/>
                        <Route path={ routeCodes.INDICACOES } component={ Indicacoes }/>
                    </Route>

                    <Route path={ routeCodes.LOGIN } component={() => <Autenticacao page="login"/>}/>
                    <Route path={ routeCodes.SIGNUP } component={() => <Autenticacao page="signup"/>}/>
                    <Route path={ routeCodes.LOGOUT } component={() => <Autenticacao page="logout"/>}/>

                    <Route path='*' component={ NotFound }/>
                </Router>
            </Index>
        );
    }
}
