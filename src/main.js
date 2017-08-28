import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import 'normalize.css';
import './main.css';
import App from './App/App';

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>,
  document.getElementById('app'),
);


store.subscribe(() => {
  // console.log('store.getState()', store.getState());
  // const total = store.getState().appReducer.total;
});
