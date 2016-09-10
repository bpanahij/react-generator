import {<%= store.reducerRoot %>} from '../state'
import {<%= action.constantName %>} from '../constants'
import {<%= action.functionName %> as reducerHash} from '../reducers/<%= action.functionName %>'
import {<%= action.functionName %> as actionFunc} from '../actions'
const reducerFunc = reducerHash[<%= action.constantName %>];

describe('Action/Reducer <%= action.functionName %>', () => {
  it('Should not modify prior state', () => {
    let state = <%= store.reducerRoot %>;
    let stateCopy = state.toJS();
    let action = actionFunc();
    let nextState = reducerFunc(state, action);
    expect(state.toJS()).deep.equals(stateCopy);
  });
  it('Sets something in application state', () => {
    let state = <%= store.reducerRoot %>;
    let action = actionFunc(items);
    let nextState = reducerFunc(state, action);
    expect(nextState).to.equal({you: "please edit"});
  });
});
