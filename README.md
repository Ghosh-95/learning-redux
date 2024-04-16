# Redux with Vanilla JavaScript

### createStore()

To create a Redux store, use 'createStore' function from redux library. It takes a callback function as a parameter. The callback function takes two parameter: a state and an action. You can return the state from the callback function.

>createStore is now deprecated, is is used here only for learning purpose.

- In order to get the state provided by store, use `getState()` method.
  ```javascript
  const store = createStore((state = {a: 1}, action) => {
    return state;
  });

  console.log(store.getState()); // {a : 1}
  ```
