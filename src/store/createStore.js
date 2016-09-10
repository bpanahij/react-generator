import {applyMiddleware, compose, createStore} from 'redux'
import {routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import {persistState} from 'redux-devtools';
import {makeRootReducer} from './createRootReducer'
import {DevTools} from '../utils/DevTools'

function getDebugSessionKey() {
  const matches = window.location.href.match(/[?&]debug_session=([^&#]+)\b/);
  return (matches && matches.length > 0) ? matches[1] : null;
}

export const makeStore = (initialState = {}, history) => {
  const middleware = [thunk, routerMiddleware(history)];
  const enhancers = [];
  if (__DEBUG__) {
    enhancers.push(persistState(getDebugSessionKey()));
    if (window.devToolsExtension && window.devToolsExtension()) {
      enhancers.push(window.devToolsExtension())
    }
    else {
      enhancers.push(DevTools.instrument());
    }
  }

  const store = createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./createRootReducer', () => {
      const reducers = require('./createRootReducer').default;
      store.replaceReducer(reducers(store.asyncReducers))
    })
  }

  return store
};
