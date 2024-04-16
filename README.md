# Redux with Vanilla JavaScript

## createStore()

To create a Redux store, use 'createStore' function from redux library. It takes a callback function as a parameter. The callback function takes two parameter: a state and an action. You can return the state from the callback function. The state is the current `global` state of the sotre and an action is what 'changes/modifies' the state.

### dispatch:
Every time we call store.dispatch(action):

-  The store calls reducer(state, action). That root reducer may call other slice reducers inside of itself, like childReducer(state.child, action)
-  The store saves the *new* state value inside.
-  The store calls all the listener subscription callbacks. If a listener has access to the store, it can now call store.getState() to read the latest state value
- *action* is a object contains one 'action-type' property that contains the type of action and one 'payload' that contains the necessary information for reducers to determine how to modify state.

>createStore is now deprecated, is is used here only for learning purpose.

- In order to get the state provided by store, use `getState()` method.
  ```javascript
  const store = createStore((state = {a: 1}, action) => {
    return state;
  });

  console.log(store.getState()); // {a : 1}
  ```
### applyMiddleWare:
Creates a store enhancer that applies middleware to the dispatch method of the Redux store. This is handy for a variety of tasks, such as expressing asynchronous actions in a concise manner, or logging every action payload.

After dispatching an event the action directly goes to the reducer to update the state, and if you need to stop the process in between to perfrom another operations (such as logging the store state, such as API calls) or any other actions 'applyMiddleware' comes handy. It temporarily stops the process.