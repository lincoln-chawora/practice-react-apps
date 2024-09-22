import "./index.eatnSplit.css"
import React, {createContext, MouseEventHandler, useContext, useState} from "react";
import {Friend, SplitInfo} from "./Apps/EatnSplit/eatnsplit.model";
import AddFriendForm from "./Apps/EatnSplit/AddFriendForm";
import Sidebar from "./Apps/EatnSplit/Sidebar";
import SplitBillForm from "./Apps/EatnSplit/SplitBillForm";

const initialFriends = [
    {
        id: 118836,
        name: "Clark",
        image: "https://i.pravatar.cc/48?u=118836",
        balance: -7,
    },
    {
        id: 933372,
        name: "Sarah",
        image: "https://i.pravatar.cc/48?u=933372",
        balance: 20,
    },
    {
        id: 499476,
        name: "Anthony",
        image: "https://i.pravatar.cc/48?u=499476",
        balance: 0,
    },
];

interface EatnSplitContextType {
    handleOnSelect: (id: number) => void;
    handleAddFriend: (e: React.FormEvent<HTMLFormElement>, newFriend: Friend) => void;
    handleOnSplit: (e: React.FormEvent<HTMLFormElement>, info: SplitInfo) => void;
    onCloseAddForm: MouseEventHandler<HTMLButtonElement>;
    onShowAddForm: MouseEventHandler<HTMLButtonElement>;
    personShowing?: Friend|null;
    friends: Friend[];
    isShowingAddForm: boolean
}
const EatnSplitContext = createContext<EatnSplitContextType>(
    {} as EatnSplitContextType
);

const AppEatSplit: React.FC = () => {
    const [friends, setFriends] = useState<Friend[]>(initialFriends);
    const [personShowing, setPersonShowing] = useState<Friend|null>(null);
    const [isShowingAddForm, setIsShowingAddForm] = useState<boolean>(false);

    function handleOnSelect(id: number) {
        const selectedPerson = friends.find((person) => person.id === id) || null;

        setPersonShowing((prevPersonShowing) => {
            // If the same person is clicked, close the form
            if (prevPersonShowing && prevPersonShowing.id === id) {
                return null;
            }
            // If a different person is clicked, show the new one
            return selectedPerson;
        });
    }

    function handleAddFriend(e: React.FormEvent<HTMLFormElement>, newFriend: Friend) {
        e.preventDefault();
        setFriends((prevState) => [...prevState, newFriend])
    }

    function handleOnSplit(e: React.FormEvent<HTMLFormElement>, info: SplitInfo) {
        setFriends(prevState =>
            prevState.map(friend =>
                friend.id === info.id ? { ...friend, balance: info.amountOwed } : friend
            )
        );
        setPersonShowing(null);
    }

    return (
        <EatnSplitContext.Provider value={{
            handleOnSelect,
            handleAddFriend,
            handleOnSplit,
            onCloseAddForm: () => setIsShowingAddForm(false),
            onShowAddForm: () => setIsShowingAddForm(true),
            personShowing,
            friends,
            isShowingAddForm
        }}>
            <div className="app">
                <div>
                    <Sidebar />

                    {isShowingAddForm && (
                        <AddFriendForm />
                    )}
                </div>

                {personShowing && (
                    <SplitBillForm key={personShowing.id} />
                )}
            </div>
        </EatnSplitContext.Provider>
    )
}

export function useSplitContext() {
    const context = useContext(EatnSplitContext);

    if (context === undefined) throw Error('Eat n Split context was used outside of Eat m Split provider.');

    return context;
}

export default AppEatSplit





