import {Inbox} from '../components/Inbox'
import {fetchThreads} from '../store/threads/actions'

export const MainRoute = (store) => ({
  component: Inbox,
  onEnter: (nextState, replace) => {
    store.dispatch(fetchThreads());
  }
});
