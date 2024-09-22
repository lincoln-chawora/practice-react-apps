import React, {Dispatch, FormEvent, SetStateAction, useState} from "react";
import {TravelItem} from "../../App.TravelList";

interface FormProps {
    onAddItems: (newItem: TravelItem) => void
}
const Form: React.FC<FormProps> = ({onAddItems}) => {
    const [description, setDescription] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!description) return;
        const newItem = {description, quantity, packed: false, id: Date.now()};

        // Function prop to add the new item into the items state.
        onAddItems(newItem);
        setDescription('');
        setQuantity(1);
    }

    return (
        <form className="add-form" onSubmit={handleSubmit}>
            <h3>What do you need for your trip?</h3>
            <select
                value={quantity}
                onChange={
                    (e) => setQuantity(Number(e.target.value))
                }>

                {Array.from({length: 20}, (_, i) => i + 1).map
                ((num) => (
                    <option value={num} key={num}>
                        {num}
                    </option>
                ))}
            </select>
            <input
                type="text"
                placeholder="Item..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <button>Add</button>
        </form>
    )
}

export default Form;