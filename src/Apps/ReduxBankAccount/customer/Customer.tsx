import {useSelector} from "react-redux";
import React from "react";
import {RootState} from "../../../store/BankAccountStore";

const Customer: React.FC = () => {
    const customer = useSelector((store: RootState) => store.customer.fullName);

    return <h2>👋 Welcome, {customer}</h2>;
}

export default Customer;