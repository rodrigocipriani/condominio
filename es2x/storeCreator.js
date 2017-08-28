import {
  combineReducers,
  createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const storeCreator = (reducers, props) => {
  const { isProduction, showLoggers } = props;
  let { loggerOptions } = props;
  const reducersObj = combineReducers(reducers);
  if (showLoggers !== undefined) {
    loggerOptions = { ...loggerOptions, predicate: () => showLoggers };
  }
  const loggerMiddleware = createLogger(loggerOptions);

  const store = isProduction ? createStore(
      reducersObj,
      applyMiddleware(thunkMiddleware),
  )
      : createStore(
          reducersObj,
          compose(
              applyMiddleware(
                  thunkMiddleware,
                  loggerMiddleware,
              ),
              window.devToolsExtension ? window.devToolsExtension() : f => f,
          ),
      );

  // https://github.com/reactjs/react-redux/releases/tag/v2.0.0
  // Hot reloading reducers is now explicit (#80)
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept(reducersObj, () => {
      store.replaceReducer(reducersObj);
    });
  }

  return store;
};

export default storeCreator;
