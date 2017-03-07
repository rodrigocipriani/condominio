import React, {Component} from 'react';
import {Router, Route, IndexRedirect, browserHistory} from 'react-router';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

import IndexView from './containers/Index/IndexView';
import AppView from './containers/App/AppView';
import LoginPage from './containers/Autenticacao/LoginPage';
import SignUpPage from './containers/Autenticacao/SignUpPage';
import Documentos from './containers/Documentos/DocumentosView';
import Forum from './containers/Forum/Index';
import Indicacoes from './containers/Indicacoes/Index';
import NotFound from './containers/NotFound/Index';
import * as autenticacaoActions from './containers/Autenticacao/autenticacaoAction';
import Auth from './containers/Autenticacao/Auth';

const publicPath = '/';
const appSubRoute = isProduction ? `${publicPath}` : publicPath;
// const appSubRoute = isProduction ? `${publicPath}diario/` : publicPath;

export const routeCodes = {
    HOME: `${ appSubRoute }`,
    LOGIN: `${ appSubRoute }login`,
    LOGOUT: `${ appSubRoute }logout`,
    SIGNUP: `${ appSubRoute }signup`,
    DOCUMENTOS: `${ appSubRoute }documentos`,
    FORUM: `${ appSubRoute }forum`,
    INDICACOES: `${ appSubRoute }indicacoes`,
};


// const appWillInit = (nextState, replace, callback) => {
//
//     // todo : assim esta assincrono, a pra deixar sincrono e só prosseguir quando tiver a resposta
//     autenticacaoActions.resquestLoggedUser();
//
//     if (!Auth.isUserAuthenticated()) {
//         replace(routeCodes.LOGIN);
//     }
//     callback();
// };

export default class Routes extends Component {

    render() {

        return (
            <IndexView>
                <Router history={ browserHistory }>

                    <Route path={routeCodes.HOME} component={AppView} onEnter={
                        (nextState, replace, callback) => {

                        if (!Auth.isUserAuthenticated()) {
                            //redireciona para o login
                            {/*replace(routeCodes.LOGIN);*/}
                            // ja tenta pegar o usuário caso esteja ja autenticado no servidor
                            // todo : assim esta assincrono, a pra deixar sincrono e só prosseguir quando tiver a resposta
                            autenticacaoActions.resquestLoggedUser();
                        }
                        callback();
                    }}>

                        <IndexRedirect to={routeCodes.DOCUMENTOS}/>

                        <Route path={ routeCodes.DOCUMENTOS } component={ Documentos }
                               onEnter={Documentos.routeWillInit}/>
                        <Route path={ routeCodes.FORUM } component={ Forum }/>
                        <Route path={ routeCodes.INDICACOES } component={ Indicacoes }/>
                    </Route>

                    <Route path={ routeCodes.LOGIN } component={ LoginPage }/>
                    <Route path={ routeCodes.SIGNUP } component={ SignUpPage }/>
                    <Route path={ routeCodes.LOGOUT } onEnter={
                        (nextState, replace, callback) => {
                            console.log('logouttttttttttttttttt');
                            autenticacaoActions.signout();

                            // todo : location... mexe com o navegador, trocar para algo nativo do react
                            location.href = routeCodes.LOGIN;

                            // change the current URL to /
                            {/*replace('/');*/
                            }
                            {/*callback();*/
                            }
                        }
                    }/>

                    <Route path='*' component={ NotFound }/>
                </Router>
            </IndexView>
        );
    }
}
