import {<%= reducer.constantName %>} from '../constants';
/**
 * Action to trigger the reducer
 * @returns {{type: string}}
 */
export const <%= reducer.functionName %> = () => {
  return {
    type: <%= reducer.constantName %>
  }
};
