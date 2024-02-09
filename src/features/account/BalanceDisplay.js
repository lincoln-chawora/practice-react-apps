import {connect} from "react-redux";

function formatCurrency(value) {
    return new Intl.NumberFormat("en", {
        style: "currency",
        currency: "USD",
    }).format(value);
}

/*
 * NOTE: This is an example of how redux state used to be passed into components.
 */
function BalanceDisplay({balance, example}) {
    // console.log(example)
    return (
        <div className="balance">{formatCurrency(balance)}</div>
    );
}

function mapStateToProps(state) {
    return {
        balance: state.account.balance,
        example: state.account.loan
    }
}

export default connect(mapStateToProps)(BalanceDisplay);