import {useReducer} from "react";

const initialState = {
    balance: 0,
    loan: 0,
    isActive: false
};

type ACTION_TYPE =
    | { type: "openAccount" }
    | { type: "depositMoney"; payload: number }
    | { type: "withdrawMoney"; payload: number }
    | { type: "requestLoan"; payload: number }
    | { type: "payLoan" }
    | { type: "closeAccount" }

function reducer(state: typeof initialState, action: ACTION_TYPE) {
    if (!state.isActive && action.type !== 'openAccount') return state;

    switch (action.type) {
        case 'openAccount':
            return {
                ...state,
                isActive: true,
                balance: 500
            }
        case 'depositMoney':
            return {
                ...state,
                balance: state.balance + action.payload
            }
        case 'withdrawMoney':
            return {
                ...state,
                balance: state.balance >= action.payload ? state.balance - action.payload : state.balance
            }
        case 'requestLoan':
            const requestedLoanAmount = action.payload;
            return {
                ...state,
                balance: state.loan > 0 ? state.balance : state.balance + requestedLoanAmount,
                loan: state.loan > 0 ? state.loan : state.loan + requestedLoanAmount
            }
        case 'payLoan':
            const loanPaid = state.balance - state.loan;

            return {
                ...state,
                balance: loanPaid,
                loan: state.loan - state.balance + loanPaid
            }
        case 'closeAccount':
            if (state.balance !== 0 || state.loan > 0) return {
                ...state
            }

            return {
                ...initialState
            }
        default:
            throw new Error('Invalid action')

    }
}

 const AppBankAccountReducer = () => {
    const [{balance, loan, isActive}, dispatch] = useReducer(reducer, initialState);

    return (
        <div className="App">
            <h1>useReducer Bank Account</h1>
            <p>Balance: £{balance}</p>
            <p>Loan: £{loan}</p>

            <p>
                <button onClick={() => dispatch({type: 'openAccount'})} disabled={isActive}>
                    Open account
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({type: 'depositMoney', payload: 150})} disabled={!isActive}>
                    Deposit 150
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({type: 'withdrawMoney', payload: 50})} disabled={!isActive}>
                    Withdraw 50
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({type: 'requestLoan', payload: 5000})} disabled={!isActive}>
                    Request a loan of 5000
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({type: 'payLoan'})} disabled={!isActive}>
                    Pay loan
                </button>
            </p>
            <p>
                <button onClick={() => dispatch({type: 'closeAccount'})} disabled={!isActive}>
                    Close account
                </button>
            </p>
        </div>
    );
}
export default AppBankAccountReducer;
