import React, {ComponentProps, ReactNode} from "react";

interface ButtonProps extends ComponentProps<"button">{
    children: ReactNode;
}

const Button: React.FC<ButtonProps> = ({children, ...props}) => {
    return (
        <button {...props}>{children}</button>
    )
}

export default Button