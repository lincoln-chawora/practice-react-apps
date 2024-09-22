import React from "react";
import Person from "./Person";
import {useSplitContext} from "../../App.EatSplit";
import Button from "./Button";

const Sidebar: React.FC = () => {
    const {isShowingAddForm, onShowAddForm, friends} = useSplitContext();
    return (
        <div className="sidebar">
            <ul>
                {friends.map((friend) => (
                    <Person key={friend.id} data={friend} />
                ))}
            </ul>

            {!isShowingAddForm && <Button onClick={onShowAddForm}>Add friend</Button>}
        </div>
    )
}

export default Sidebar