import CreateCustomer from "./Apps/ReduxBankAccount/customer/CreateCustomer";
import Customer from "./Apps/ReduxBankAccount/customer/Customer";
import AccountOperations from "./Apps/ReduxBankAccount/account/AccountOperations";
import BalanceDisplay from "./Apps/ReduxBankAccount/account/BalanceDisplay";
import "./Apps/ReduxBankAccount/index.ReduxBankAccount.css"
import {useSelector} from "react-redux";

function AppBankAccountRedux() {
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

export default AppBankAccountRedux;