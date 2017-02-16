import React, {Component} from 'react';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

import App from './index';
import Documentos from './containers/Documentos/documentosView';
import Forum from './containers/Forum';
import Indicacoes from './containers/Indicacoes';
import NotFound from 'views/NotFound';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const publicPath = '/';
const appSubRoute = isProduction ? `${publicPath}` : publicPath;
// const appSubRoute = isProduction ? `${publicPath}diario/` : publicPath;

export const routeCodes = {
    DOCUMENTOS: `${ appSubRoute }documentos`,
    FORUM: `${ appSubRoute }forum`,
    INDICACOES: `${ appSubRoute }indicacoes`,
    ABOUT: `${ appSubRoute }about`,
};

export default class Routes extends Component {
    render() {
        return (
            <Router history={ browserHistory }>
                <Route path={ publicPath } component={ App }>

                    <IndexRoute component={ Documentos }/>

                    <Route path={ routeCodes.DOCUMENTOS } component={ Documentos }/>
                    <Route path={ routeCodes.FORUM } component={ Forum }/>
                    <Route path={ routeCodes.INDICACOES } component={ Indicacoes }/>

                    <Route path='*' component={ NotFound }/>
                </Route>
            </Router>
        );
    }
}
