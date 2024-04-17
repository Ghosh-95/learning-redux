# Redux with Vanilla JavaScript

To create a json server, install json-server:
```bash
npm install -g json-server
```
Then create a server with the specific json file:
```bash
json-server < source of the json file >
```

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

Actions must return an object type, not any promise or any async operation should be done inside an action. That's why need a middleware to perform asynchronous task. The code below will throw an error, because it the function is performing an asynchronous task :
```js
async function increment() {
  const {data} = await axios.get('valid url');

  return {type: 'increment', payload: data.value};
};
```

## redux-thunk:
It is a middleware that stops dispatching an action, and in the meantime it performs an asynchronous task. Add it into applyMiddleware function in the sotre.
```bash
npm install redux-thunk
```
```js
import {thunk} from redux-thunk
```
While using thunk, send a function definition instead of a function call inside store dispatch.
```javascript
async function increment(){
  const {data} = await axios.get('valid url');

  return {type: 'increment', payload: data.value};
}

// ❌ Not this
store.dispatch(increment());

// ✅ Use this
store.dispatch(increment);

// increment is a function where you are performing an async operation.
```
Now thunk will give the action creator function two parameters: dispatch, getState. The creator function will automatically stops the async execution because you've used a function definition inside the store dispatcher. And you can disptach the object inside the creator function.
```js
async function increment(disptach, getState) {
  const {data} = await axios.get('valid url');

  // you can dispatch an action inside the action creator
  dispatch({type: 'increment', payload: data.value});
}
```
>Now the 'increment' action will run two times, in the first run it will stop because of the asynchronous operation and it will not update the state. In the second run the async operation will finish and the state will update with the new data.