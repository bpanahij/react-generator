import {Window} from '../components/Window'
import {MainRoute} from './MainRoute'

export const createRoutes = (store) => ({
  path: '/',
  component: Window,
  indexRoute: MainRoute(store),
  childRoutes: [
  ]
});
