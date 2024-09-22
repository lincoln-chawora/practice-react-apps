import React, {ReactElement, ReactNode, useState} from "react";
import './index.steps.css';

const messages = [
    "Learn react",
    "Apply for jobs",
    "Invest in your new income"
];

export default function AppSteps() {
    return (
        <div>
            <Steps />
        </div>
    )
}

const Steps: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    function handlePrevious() {
        if (step > 1) setStep((prevState) => prevState - 1);
    }

    function handleNext() {
        if (step < 3) {
            setStep((prevState) => prevState + 1);
        }
    }

    return (
        <div>
            <button className="close" onClick={(e: React.MouseEvent<HTMLButtonElement>) => setIsOpen((isOpen) => !isOpen)}>
                {isOpen ? 'X' : '+'}
            </button>

            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={step >= 1 ? "active" : ""}>1</div>
                        <div className={step >= 2 ? "active" : ""}>2</div>
                        <div className={step >= 3 ? "active" : ""}>3</div>
                    </div>

                    <StepMessage step={step}>
                        {messages[step - 1] ?? 'Unknown step'}
                    </StepMessage>

                    <div className="buttons">
                        <Button onClick={handlePrevious} >
                            <span>👈</span>
                            Previous
                        </Button>

                        <Button onClick={handleNext}>
                            Next
                            <span>👉</span>
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}

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

interface ButtonProps {
    readonly children: ReactNode;
    readonly textColour?: string;
    readonly bgColour?: string;
    readonly onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({children, textColour = '#fff', bgColour = '#7950f2', onClick}) => {
    return (
        <button
            style={{ backgroundColor: bgColour, color: textColour}}
            onClick={onClick}
        >
            {children}
        </button>
    )
}