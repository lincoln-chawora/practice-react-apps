import React, {ReactNode} from "react";

interface StepMessageProps {
    readonly step: number;
    readonly children: ReactNode
}
const StepMessage: React.FC<StepMessageProps> = ({step, children}) => {
    return (
        <div className="message">
            <h3>Step {step}</h3>
            {children}
        </div>
    )
}

export default StepMessage;