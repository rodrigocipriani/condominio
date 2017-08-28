import Vue from 'vue';
import 'normalize.css';
import App from './App/App';
import './main.css';
import reduxStorePlugin from '../es2x/vue-redux-connect/reduxStorePlugin';
import store from './store';

Vue.use(reduxStorePlugin);

/* eslint-disable no-new */
const main = new Vue({
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
  // console.log('total', total);
  // console.log('App', App);
  // App.state.total = total;
  // main.$forceUpdate();
});
