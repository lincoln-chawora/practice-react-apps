import {connect} from "react-redux";
import {RootState} from "../../../store/BankAccountStore";

function formatCurrency(value: number) {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

/*
 * NOTE: This is an example of how redux state used to be passed into components.
 */
interface BalanceDisplayProps {
    balance: number;
}

function BalanceDisplay({balance}: BalanceDisplayProps) {
    return (
        <div className="balance">{formatCurrency(balance)}</div>
    );
}

function mapStateToProps(state: RootState) {
    return {
        balance: state.account.balance,
    }
}

export default connect(mapStateToProps)(BalanceDisplay);