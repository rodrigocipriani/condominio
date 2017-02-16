import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import {
    createStore,
    applyMiddleware,
    compose,
} from 'redux'

import reducers from './reducers';

console.log('reducers', reducers);

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

export default store;
