/**
 * Create an observable, for watching a specific selection of state and handling the change somehow
 * @param store - a Redux store
 * @param select - function to call to determine if change is made
 * @param onChange - function to call when change is detected
 * @returns {*} - a function to the unsubscribe
 */
export const observeStore = (store, select, onChange) => {
  let currentState;

  function handleChange() {
    let nextState = select(store.getState());
    if (nextState !== currentState) {
      currentState = nextState;
      onChange(currentState);
    }
  }

  let unsubscribe = store.subscribe(handleChange);
  handleChange();
  return unsubscribe;
};
