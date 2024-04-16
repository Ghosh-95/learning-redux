import { createStore } from "redux";


const store = createStore(function (state = { amount: 1 }, action) {
    return state;
});
console.log(store.getState());

