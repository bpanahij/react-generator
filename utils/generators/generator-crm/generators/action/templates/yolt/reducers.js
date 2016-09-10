/**
 * Initial State object for <%= store.reducerRoot %>
 */
import {<%= store.reducerRoot %>} from './state'
/**
 * Action handlers, which combine state and action data into a new states
 * @type {{}}
 */
let ACTION_HANDLERS = {};

/**
 * A reducer to handle all mutations of the "<%= store.reducerRoot %>" state property
 * @param state
 * @param action
 * @returns {*}
 */
export function <%= store.reducerRoot %>Reducer(state = <%= store.reducerRoot %>, action) {
  const handler = ACTION_HANDLERS[action.type];
  return handler ? handler(state, action) : state
}
