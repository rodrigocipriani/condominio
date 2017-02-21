import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './index';
import LoginPage from './containers/autenticacao/LoginPage';
import SignUpPage from './containers/autenticacao/SignUpPage';
import Documentos from './containers/Documentos/documentosView';
import Forum from './containers/Forum';
import Indicacoes from './containers/Indicacoes';
import NotFound from './containers/NotFound';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const publicPath = '/';
const appSubRoute = isProduction ? `${publicPath}` : publicPath;
// const appSubRoute = isProduction ? `${publicPath}diario/` : publicPath;

export const routeCodes = {
    LOGIN: `${ appSubRoute }login`,
    SIGNUP: `${ appSubRoute }signup`,
    DOCUMENTOS: `${ appSubRoute }documentos`,
    FORUM: `${ appSubRoute }forum`,
    INDICACOES: `${ appSubRoute }indicacoes`,
};

export default class Routes extends Component {
    render() {
        return (
            <Router history={ browserHistory }>
                <Route path={ publicPath } component={ App }>

                    <IndexRoute component={ Documentos } onEnter={Documentos.routeWillInit}/>

                    <Route path={ routeCodes.LOGIN } component={ LoginPage } onEnter={Documentos.routeWillInit}/>
                    <Route path={ routeCodes.SIGNUP } component={ SignUpPage } onEnter={Documentos.routeWillInit}/>
                    <Route path={ routeCodes.DOCUMENTOS } component={ Documentos } onEnter={Documentos.routeWillInit}/>
                    <Route path={ routeCodes.FORUM } component={ Forum }/>
                    <Route path={ routeCodes.INDICACOES } component={ Indicacoes }/>

                    <Route path='*' component={ NotFound }/>
                </Route>
            </Router>
        );
    }
}
