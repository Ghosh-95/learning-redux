import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";

const history = [];
const inc = 'increment', dec = 'decrement', incByAmt = 'incrementByAmt';


const store = createStore(reducer, applyMiddleware(logger.default));

function reducer(state = { amount: 1 }, action) {

    if (action.type === inc) {
        // redux doesn't allow to mutate the orginal state
        // state.amount++;

        return { amount: state.amount + 1 } // You need to make a copy of the state.
    }

    if (action.type === dec) return { amount: state.amount - 1 };

    if (action.type === incByAmt) return { amount: state.amount + action.payload };

    return state;
}

// Action creators
const increment = () => ({ type: 'increment' });
const incrementByAmt = () => ({ type: 'incrementByAmt', payload: 5 });
const decrement = () => ({ type: 'decrement' });

setInterval(() => {
    store.dispatch(incrementByAmt());
}, 2000);