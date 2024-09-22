import React, {useState} from "react";
import './index.steps.css';
import StepMessage from "./Apps/Steps/StepMessage";
import Button from "./Apps/Steps/Button";

const messages = [
    "Learn react",
    "Apply for jobs",
    "Invest in your new income"
];

const AppSteps: React.FC = () => {
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
            <Button classes="close" onClick={() => setIsOpen((isOpen) => !isOpen)}>
                {isOpen ? 'X' : '+'}
            </Button>

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

export default AppSteps;