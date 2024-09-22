import React from "react";
import BalanceCalculation from "./BalanceCalculation";
import {Friend} from "./eatnsplit.model";
import {useSplitContext} from "../../App.EatSplit";
import Button from "./Button";

interface PersonProps {
    data: Friend;
}
const Person: React.FC<PersonProps> = ({data}) => {
    const {handleOnSelect, personShowing} = useSplitContext();
    const isOpen = personShowing?.id === data.id;

    return (
        <li>
            <img src={data.image} alt=""/>
            <h3>{data.name}</h3>
            <BalanceCalculation balance={data.balance} name={data.name}/>
            <Button onClick={() => handleOnSelect(data.id)}>{isOpen ? 'Close' : 'Select'}</Button>
        </li>
    )
}

export default Person