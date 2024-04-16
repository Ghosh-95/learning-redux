import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";

const history = [];
const store = createStore(reducer, applyMiddleware(logger.default));

function reducer(state = { amount: 1 }, action) {

    if (action.type === 'increment') {
        // redux doesn't allow to mutate the orginal state
        // state.amount++;

        return { amount: state.amount + 1 } // You need to make a copy of the state.
    }

    return state;
}

setInterval(() => {
    store.dispatch({ type: 'increment' });
}, 2000);