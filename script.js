import { applyMiddleware, createStore, combineReducers } from "redux";
import logger from "redux-logger";
import axios from "axios";
import { thunk } from "redux-thunk";

const history = [];
const inc = 'account/increment', dec = 'account/decrement', incByAmt = 'account/incrementByAmt', getUserAccPending = 'account/getUser/pending', getUserAccFulfilled = 'account/getUser/fulfilled', getUserAccRejected = 'account/getUser/rejected';
const incBonus = 'bonus/increment', decBonus = 'bonus/decreement';


const store = createStore(combineReducers({
    account: reducerAccounts,
    bonuses: reducerBonuses
}), applyMiddleware(logger.default, thunk));

function reducerAccounts(state = { amount: 1 }, action) {

    switch (action.type) {
        case getUserAccFulfilled:
            return { amount: action.payload, pending: false };
        case getUserAccPending:
            return { ...state, pending: true };
        case getUserAccRejected:
            return { ...state, error: action.error, pending: false };
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

function reducerBonuses(state = { points: 0 }, action) {
    switch (action.type) {
        case incBonus:
            return { points: state.points + 1 }
        case incByAmt:
            if (action.payload >= 100)
                return { points: state.points + 1 };
        case dec:
            if (action.payload <= 100);
            return { points: state.points - 1 };
        default:
            return state;
    }
}

// Action creators
const increment = () => ({ type: inc });
const incrementBonus = () => ({ type: incBonus });
const incrementByAmt = (value) => ({ type: incByAmt, payload: value });
const decrement = () => ({ type: dec });
function getUserAccount(id) {
    return async (dispatch, getState) => {
        try {
            dispatch(initUserAccPending());

            const { data } = await axios.get(`http://localhost:3000/accounts/${id}`);
            dispatch(initUserAccFulfilled(data.amount));
        } catch (error) {
            dispatch(initUserAccRejected(error.message));
        }
    }
};
const initUserAccFulfilled = (value) => ({ type: getUserAccFulfilled, payload: value });
const initUserAccPending = () => ({ type: getUserAccPending });
const initUserAccRejected = (error) => ({ type: getUserAccRejected, error: error });


setTimeout(() => {
    store.dispatch(getUserAccount(2));
    // store.dispatch(incrementBonus());
}, 2000);