import fetch from 'isomorphic-fetch';
import {} from '../actions';

/**
 * A Thunk can dispatch multiple actions, and perform asynchronous tasks
 * @returns {Function}
 */
export const <%= reducer.functionName %> = () => {
  return function (dispatch) {
    // Dispatch an action to let app know something asyn is going to happen
    return fetch(`some_url`, {credentials: 'include'})
      .then(response => response.json())
      .then((json) => {
          // Dispatch an action to let app know it happened
        }
      )
  }
};
