import { useState } from "react";
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

function Steps() {
    const [step, setStep] = useState(1);
    const [isOpen, setIsOpen] = useState(true);

    function handlePrevious() {
        if (step > 1) setStep((s) => s - 1);
    }

    function handleNext() {
        if (step < 3) {
            setStep((s) => s + 1);
        }
    }

    return (
        <div>
            <button className="close" onClick={() => setIsOpen((is) => !is)}>
                &times;
            </button>

            {isOpen && (
                <div className="steps">
                    <div className="numbers">
                        <div className={step >= 1 ? "active" : ""}>1</div>
                        <div className={step >= 2 ? "active" : ""}>1</div>
                        <div className={step >= 3 ? "active" : ""}>1</div>
                    </div>

                    <StepMessage step={step}>
                        {messages[step - 1]}
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

function StepMessage({step, children}) {
    return (
        <div className="message">
            <h3>Step {step}</h3>
            {children}
        </div>
    )
}

function Button({children, textColour = '#fff', bgColour = '#7950f2', onClick}) {
    return (
        <button
            style={{ backgroundColor: bgColour, color: textColour}}
            onClick={onClick}
        >
            {children}
        </button>
    )
}