import CreateCustomer from "./features/customer/CreateCustomer";
import Customer from "./features/customer/Customer";
import AccountOperations from "./features/account/AccountOperations";
import BalanceDisplay from "./features/account/BalanceDisplay";
import "./index.ReduxIntro.css"
import {useSelector} from "react-redux";

function AppReduxIntro() {
    const fullName = useSelector(store => store.customer.fullName);
    return (
        <div>
            <h1>🏦 The React-Redux Bank ⚛️</h1>
            {fullName === "" ? (
                <CreateCustomer />
            ) : (
                <>
                    <Customer />
                    <AccountOperations />
                    <BalanceDisplay />
                </>
            )}
        </div>
    );
}

export default AppReduxIntro;