import React from 'react'
import ReactDOM from 'react-dom'
import {Router} from 'react-router'
import {Provider} from 'react-redux'
import {store, history} from './store'
import {createRoutes} from './routes'
import 'isomorphic-fetch'

const MOUNT_NODE = document.getElementById('root');
const routes = createRoutes(store);
let counter = 0;
const render = (routes, routerKey = null) => {
  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} children={routes} key={routerKey}/>
    </Provider>,
    MOUNT_NODE
  );
};

render(routes, counter);

// Hot reloading of routes takes special care....
if (module.hot) {
  module.hot.accept('./routes', function () {
    counter++;
    let newRoutes = require('./routes');
    render(newRoutes.createRoutes(store), counter)
  });
}

