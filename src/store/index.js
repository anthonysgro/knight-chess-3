// Main Redux Imports
import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

// Sub Reducers
import { boardState, userMovement } from "./reducers";

// Combined Reducer
const reducer = combineReducers({ boardState, userMovement });

// Redux Middleware
const middleware = applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true }),
);

// // Creates Redux Store
const store = createStore(reducer, middleware);
export default store;
