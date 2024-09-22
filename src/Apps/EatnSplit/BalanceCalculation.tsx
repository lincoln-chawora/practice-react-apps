import React from "react";

interface BalanceCalculationProps {
    balance: number;
    name: string;
}
const BalanceCalculation: React.FC<BalanceCalculationProps> = ({balance, name}) => {
    let message = `You and ${name} are even`;
    let status = '';

    if (balance < 0) {
        message = `You owe ${name} £${Math.abs(balance)}`;
        status = 'red';
    }

    if (balance > 0) {
        message = `${name} owes you £${balance}`;
        status = 'green';
    }

    return (
        <p className={status}>
            {message}
        </p>
    )
}

export default BalanceCalculation;