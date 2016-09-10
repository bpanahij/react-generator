import {makeStore} from './createStore'
import {registerReducers} from './createRootReducer'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import {useRouterHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'
import {} from './registerSubscriptions'

const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
});

export const store = makeStore({}, browserHistory);
registerReducers(store);

export const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
});

if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

