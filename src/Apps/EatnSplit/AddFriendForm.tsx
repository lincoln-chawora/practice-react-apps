import React, {useState} from "react";
import Input from "./Input";
import {useSplitContext} from "../../App.EatSplit";
import Button from "./Button";

const AddFriendForm: React.FC = () => {
    const {handleAddFriend, onCloseAddForm} = useSplitContext();
    const [name, setName] = useState<string>('');
    const [imageUrl, setImageUrl] = useState<string>('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (name && imageUrl) {
            const newPal = {
                name: name,
                image: imageUrl,
                id: Date.now(),
                balance: 0,
            };

            handleAddFriend(e, newPal);
            setName('');
            setImageUrl('');
        }
    }

    return (
        <div>
            <form className="form-add-friend" onSubmit={e => handleSubmit(e)}>
                <Input type="text" value={name} onChange={(e) => setName(e.target.value)}>👭 Friend name</Input>

                <Input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}>🌄 Image URL</Input>

                <Button>Add</Button>
            </form>
            <Button onClick={onCloseAddForm}>Close</Button>
        </div>
    )
}

export default AddFriendForm