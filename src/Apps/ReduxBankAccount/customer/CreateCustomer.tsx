import React, { useState } from "react";
import {useDispatch} from "react-redux";
import {createCustomer} from "./customerSlice";
import Input from "../Input";
import Button from "../Button";

const Customer: React.FC = () => {
    const [fullName, setFullName] = useState<string>("");
    const [nationalId, setNationalId] = useState<string>("");
    const dispatch = useDispatch();

    function handleClick() {
        if (!fullName || !nationalId) return;

        dispatch(createCustomer(fullName, nationalId));
    }

    return (
        <div>
            <h2>Create new customer</h2>
            <div className="inputs">
                <div>
                    <Input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)}>
                        Customer full name
                    </Input>
                </div>
                <div>
                    <Input type="text" value={nationalId} onChange={(e) => setNationalId(e.target.value)}>
                        National ID
                    </Input>
                </div>
                <Button onClick={handleClick}>Create new customer</Button>
            </div>
        </div>
    );
}

export default Customer;