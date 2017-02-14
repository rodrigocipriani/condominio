import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './index';
import Home from 'views/Home';
import About from 'views/About';
import NotFound from 'views/NotFound';

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';
const publicPath = '/';
const appSubRoute = isProduction ? `${publicPath}` : publicPath;
// const appSubRoute = isProduction ? `${publicPath}diario/` : publicPath;

export const routeCodes = {
  HOME: appSubRoute,
  ABOUT: `${ appSubRoute }about`,
};

export default class Routes extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path={ publicPath } component={ App }>

          <IndexRoute component={ Home } />

          <Route path={ routeCodes.HOME } component={ Home } />
          <Route path={ routeCodes.ABOUT } component={ About } />

          <Route path='*' component={ NotFound } />
        </Route>
      </Router>
    );
  }
}
