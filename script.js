import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import axios from "axios";
import { thunk } from "redux-thunk";

const history = [];
const inc = 'increment', dec = 'decrement', incByAmt = 'incrementByAmt', init = 'initial';


const store = createStore(reducer, applyMiddleware(logger.default, thunk));

function reducer(state = { amount: 1 }, action) {

    switch (action.type) {
        case init:
            return { amount: action.payload }
        case inc:
            return { amount: state.amount + 1 };
        case dec:
            return { amount: state.amount - 1 };
        case incByAmt:
            return { amount: state.amount + action.payload }
        default:
            return state;
    }
}

// Action creators
const increment = () => ({ type: inc });
const incrementByAmt = () => ({ type: incByAmt, payload: 5 });
const decrement = () => ({ type: dec });
function getUser(id) {
    return async (dispatch, getState) => {
        const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
        dispatch(initUser(data.amount));
    }
};
const initUser = (value) => ({ type: init, payload: value });


setTimeout(() => {
    // store.dispatch(incrementByAmt());
    store.dispatch(getUser(3));
}, 2000);