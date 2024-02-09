const initialStateAccount = {
    balance: 0,
    loan: 0,
    loanPurpose: '',
    isLoading: false,
};

export default function accountReducer(state = initialStateAccount, action) {
    switch (action.type) {
        case 'account/deposit':
            return {
                ...state,
                balance: state.balance + action.payload,
                isLoading: false
            }
        case 'account/withdraw':
            return {
                ...state,
                balance: state.balance - action.payload
            }
        case 'account/requestLoan':
            if (state.loan > 0) return state;
            return {
                ...state,
                loan: action.payload.amount,
                loanPurpose: action.payload.purpose,
                balance: state.balance + action.payload.amount
            }
        case 'account/payLoan':
            return {
                ...state,
                loan: 0,
                loanPurpose: '',
                balance: state.balance - state.loan
            }
        case 'account/convertingCurrency':
            return {
                ...state,
                isLoading: true,
            }
        default:
            return state
    }
}

export function deposit(amount, currency) {
    if (currency === 'USD') return { type: 'account/deposit', payload: amount };

    // Using thunks means that we can return a function as opposed to the dispatch object, this function is ran after
    // the action is dispatched but before the store is updated. In the example below we're using an async operation to
    // convert currency amount from an api. Once we have the value we dispatch the deposit action with the payload we
    // want.
    return async function (dispatch, getState) {
        // const state = getState();

        dispatch({ type: 'account/convertingCurrency'});

        const response = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`)
        const data = await response.json();
        const converted = data.rates.USD;

        // Return action.
        dispatch({ type: 'account/deposit', payload: converted });
    }

}

export function withdraw(amount) {
    return {type: 'account/withdraw', payload: amount}
}

export function requestLoan(amount, purpose) {
    return {type: 'account/requestLoan', payload: {
            amount,
            purpose
        }}
}

export function payLoan() {
    return {type: 'account/payLoan'}
}
