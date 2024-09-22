import React, {MouseEventHandler, ReactNode} from "react";

interface ButtonProps {
    readonly children: ReactNode;
    readonly textColour?: string;
    readonly bgColour?: string;
    readonly onClick: MouseEventHandler<HTMLButtonElement>;
    readonly classes?: string
}

const Button: React.FC<ButtonProps> = ({children, textColour = '#fff', bgColour = '#7950f2', classes= '', onClick}) => {
    return (
        <button className={classes}
                style={{ backgroundColor: bgColour, color: textColour}}
                onClick={onClick}
        >
            {children}
        </button>
    )
}

export default Button;