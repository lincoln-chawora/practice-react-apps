import React, {Dispatch, SetStateAction, useState} from "react";

const AppTipCalculator: React.FC = () => {
    const [billAmount, setBillAmount] = useState<number>(0);
    const [yourTip, setYourTip] = useState<number>(0);
    const [friendTip, setFriendTip] = useState<number>(0);

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
                <input
                    type="number"
                    placeholder="0"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBillAmount(Number(e.target.value) || 0)}
                />
            </div>

            <SelectTipAmount onTipChange={setYourTip}>How did you like the service?</SelectTipAmount>
            <SelectTipAmount onTipChange={setFriendTip}>How did your friend like the service?</SelectTipAmount>

            {billAmount > 0 && (
                <>
                    <Output bill={billAmount} tip={tip} />
                    <ResetButton onReset={handleReset} />
                </>
            )}

        </div>
    );
}

export default AppTipCalculator

interface OutputProps {
    readonly bill: number;
    readonly tip: number;
}
const Output: React.FC<OutputProps> = ({bill, tip}) => {
    return (
        <h3>You pay £{bill + tip} (£{bill} + £{tip} tip)</h3>
    )
}

interface SelectTipAmountProps {
    children: React.ReactNode;
    onTipChange: Dispatch<SetStateAction<number>>;
}
const SelectTipAmount: React.FC<SelectTipAmountProps> = ({children, onTipChange}) => {
    return (
        <div>
            <label>{children}</label>

            <select onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onTipChange(Number(e.target.value))}>
                <option value={0}>Dissatisfied (0%)</option>
                <option value={5}>It was okay (5%)</option>
                <option value={10}>It was good (10%)</option>
                <option value={20}>Absolutely amazing (20%)</option>
            </select>
        </div>
    )
}

interface ResetButtonProps {
    onReset: () => void
}

const ResetButton: React.FC<ResetButtonProps> = ({onReset}) => {
    return (
        <button onClick={onReset}>Reset</button>
    )
}