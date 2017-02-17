import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux'

import reducers from './reducers';

const loggerMiddleware = createLogger();

const isProduction = process.env.NODE_ENV === 'production';

const store = isProduction ?
    createStore(
        reducers,
        applyMiddleware(thunkMiddleware)
    )
    :
    createStore(
        reducers,
        compose(
            applyMiddleware(
                thunkMiddleware,
                loggerMiddleware
            ),
            window.devToolsExtension ? window.devToolsExtension() : f => f),
    );

// https://github.com/reactjs/react-redux/releases/tag/v2.0.0
// Hot reloading reducers is now explicit (#80)
if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers.js', () => {
        const nextRootReducer = require('./reducers.js');
        store.replaceReducer(nextRootReducer);
    });
}

export default store;
