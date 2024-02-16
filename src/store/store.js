import accountReducer from "../features/account/accountSlice";
import customerReducer from "../features/customer/customerSlice";
import {configureStore} from "@reduxjs/toolkit";

const store = configureStore({reducer: {
    account: accountReducer,
    customer: customerReducer
}})

/*
// Old method of creating redux store without redux toolkit.
const rootReducer = combineReducers({
    account: accountReducer,
    customer: customerReducer
})
store = configureStore(

const OLD_STORE = createStore(
    rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk)),
    );
*/
export default store;
