import Vue from 'vue';
import App from './App/App';
import reduxStorePlugin from '../es2x/vue-redux-connect/reduxStorePlugin';
import store from './store';
import 'normalize.css';
import './main.css';


Vue.use(reduxStorePlugin);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // router,
  store,
  render: h => (
      <App/>
  ),
});

store.subscribe(() => {
  // console.log('store.getState()', store.getState());
  // const total = store.getState().appReducer.total;
});
