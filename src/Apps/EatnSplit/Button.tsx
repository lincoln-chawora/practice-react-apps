import React, {MouseEventHandler, ReactNode} from "react";

interface ButtonProps {
    children: ReactNode;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}
const Button: React.FC<ButtonProps> = ({children, onClick}) => {
    return (
        <button className="button" onClick={onClick}>{children}</button>
    )
}

export default Button;