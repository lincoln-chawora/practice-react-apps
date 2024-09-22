import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import {deposit, payLoan, requestLoan, withdraw} from "./accountSlice";
import Input from "../Input";
import Button from "../Button";
import {AppDispatch, RootState} from "../../../store/BankAccountStore";

const AccountOperations: React.FC = () => {
    const [depositAmount, setDepositAmount] = useState<number>(0);
    const [withdrawalAmount, setWithdrawalAmount] = useState<number>(0);
    const [loanAmount, setLoanAmount] = useState<number>(0);
    const [loanPurpose, setLoanPurpose] = useState<string>("");
    const [currency, setCurrency] = useState<string>("USD");

    const dispatch: AppDispatch = useDispatch();
    const {loan: currentLoan, loanPurpose: currentLoanPurpose, isLoading} = useSelector((store: RootState) => store.account);

    function handleDeposit() {
        if (!depositAmount) return;

        dispatch(deposit(depositAmount, currency));
        setDepositAmount(0);
        setCurrency('USD');
    }

    function handleWithdrawal() {
        if (!withdrawalAmount) return;

        dispatch(withdraw(withdrawalAmount));
        setWithdrawalAmount(0);
    }

    function handleRequestLoan() {
        if (loanAmount < 1 && loanPurpose !== '') return;

        dispatch(requestLoan(loanAmount, loanPurpose));
        setLoanAmount(0);
        setLoanPurpose('');
    }

    function handlePayLoan() {
        dispatch(payLoan());
    }

    return (
        <div>
            <h2>Your account operations</h2>
            <div className="inputs">
                <div>
                    <Input value={depositAmount} onChange={(e) => setDepositAmount(+e.target.value)}>
                        Deposit
                    </Input>

                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <option value="USD">US Dollar</option>
                        <option value="EUR">Euro</option>
                        <option value="GBP">British Pound</option>
                    </select>

                    <Button onClick={handleDeposit} disabled={isLoading}>
                        {isLoading ? 'Converting...' : `Deposit ${depositAmount} ${currency}`}
                    </Button>
                </div>

                <div>
                    <Input value={withdrawalAmount} onChange={(e) => setWithdrawalAmount(+e.target.value)}>
                        Withdraw
                    </Input>

                    <Button onClick={handleWithdrawal}>
                        Withdraw {withdrawalAmount}
                    </Button>
                </div>

                <div>
                    <Input value={loanAmount} onChange={(e) => setLoanAmount(+e.target.value)}>
                        Request loan
                    </Input>

                    <Input type="text" required={true} value={loanPurpose} onChange={(e) => setLoanPurpose(e.target.value)} />

                    <Button onClick={handleRequestLoan}>Request loan</Button>
                </div>

                {currentLoan > 0 && (
                    <div>
                        <span>Pay back ${currentLoan} ({currentLoanPurpose})</span>
                        <Button onClick={handlePayLoan}>Pay loan</Button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AccountOperations;