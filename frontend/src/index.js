import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import logger from './dev/logger';

import Routes from './app/routes';
import store from './app/lib/store';

import './app/app.scss';

const isProduction = process.env.NODE_ENV === 'production';

ReactDOM.render(
  <Provider store={ store }>
    { isProduction ?
      <Routes /> :
      <div>
        <Routes />
        {/*<div>Desenvolvimento</div>*/}
      </div> }
  </Provider>,
  document.getElementById('root')
);
