import React, {ChangeEventHandler, ReactNode} from "react";

interface InputProps {
    children: ReactNode;
    type?: string;
    value: number | string;
    onChange?: ChangeEventHandler<HTMLInputElement>
    isDisabled?: boolean
}
const Input: React.FC<InputProps> = ({children, type = 'number', value, onChange, isDisabled = false}) => {
    return (
        <>
            <label>{children}</label>
            <input type={type} disabled={isDisabled} value={value} onChange={onChange} />
        </>
    )
}

export default Input