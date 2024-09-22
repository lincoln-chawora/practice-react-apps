import React, {useState} from "react";
import Input from "./Input";
import {useSplitContext} from "../../App.EatSplit";
import Button from "./Button";

const SplitBillForm: React.FC = () => {
    const {handleOnSplit, personShowing: person } = useSplitContext();

    const [bill, setBill] = useState<number>(0);
    const [expense, setExpense] = useState<number>(0);
    const [payer, setPayer] = useState<string>('you');

    let friendExpense = bill - expense;

    let amountOwed = friendExpense;

    if (payer !== 'you') {
        amountOwed = -expense;
    }

    function splitHandler(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const info = {
            amountOwed,
            id: person!.id
        }
        handleOnSplit(e, info);
    }

    return (
        <div>
            <form className="form-split-bill" onSubmit={splitHandler}>
                <h2>Split a bill with {person!.name}</h2>

                <Input value={bill} onChange={(e) => setBill(Number(e.target.value))}>💰 Bill value</Input>

                <Input value={expense} onChange={(e) => setExpense(Number(e.target.value))}>🧍 Your expense</Input>

                <Input value={friendExpense} isDisabled={true}>👭 {person!.name}'s expense</Input>

                <label>🤑 Who is paying the bill?</label>
                <select value={payer} onChange={e => setPayer(e.target.value)}>
                    <option value="you">You</option>
                    <option value={person!.name}>{person!.name}</option>
                </select>

                <Button>Split bill</Button>
            </form>
        </div>
    )
}

export default SplitBillForm;