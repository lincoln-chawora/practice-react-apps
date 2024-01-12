import {useState} from "react";

export default function AppTipCalculator() {
    const [billAmount, setBillAmount] = useState(0);
    const [yourTip, setYourTip] = useState(0);
    const [friendTip, setFriendTip] = useState(0);

    const tip = billAmount * ((yourTip + friendTip) / 2 / 100);

    function handleReset() {
        setBillAmount(0);
        setYourTip(0);
        setFriendTip(0);
    }
    return (
        <div>
            <div>
                <label>How much was the bill?</label>
                <input type="number" placeholder={0} onChange={e => setBillAmount(Number(e.target.value))}/>
            </div>

            <SelectTipAmount onTipChange={setYourTip}>How did you like the service?</SelectTipAmount>
            <SelectTipAmount onTipChange={setFriendTip}>How did your friend like the service?</SelectTipAmount>

            {billAmount ?
                <>
                    <Output bill={billAmount} tip={tip} />
                    <ResetButton onReset={handleReset} />
                </> : ''
            }

        </div>
    );
}

function Output({bill, tip}) {
    return (
        <h3>You pay £{bill + tip} (£{bill} + £{tip} tip)</h3>
    )
}

function SelectTipAmount({children, onTipChange}) {
    return (
        <div>
            <label>{children}</label>

            <select onChange={e => onTipChange(Number(e.target.value))}>
                <option value="0">Dissatisfied (0%)</option>
                <option value="5">It was okay (5%)</option>
                <option value="10">It was good (10%)</option>
                <option value="20">Absolutely amazing (20%)</option>
            </select>
        </div>
    )
}

function ResetButton({onReset}) {
    return (
        <button onClick={onReset}>Reset</button>
    )
}