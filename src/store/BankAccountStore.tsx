import accountReducer from "../Apps/ReduxBankAccount/account/accountSlice";
import customerReducer from "../Apps/ReduxBankAccount/customer/customerSlice";
import {configureStore} from "@reduxjs/toolkit";

const bankAccountStore = configureStore({
    reducer: {
        account: accountReducer,
        customer: customerReducer
    }
});

export type RootState = ReturnType<typeof bankAccountStore.getState>
export type AppDispatch = typeof bankAccountStore.dispatch;

export default bankAccountStore;

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
