import {<%= reducer.constantName %>} from '../constants';
/**
 * Reducer to update the store
 * @returns {{type: string}}
 */
export const <%= reducer.functionName %> = {
  [<%= reducer.constantName %>]: (state, action) => {
    return state
  }
};
