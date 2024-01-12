import "./index.eatnSplit.css"
import {useState} from "react";

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

export default function AppEatSplit() {
    const [friends, setFriends] = useState(initialFriends);
    const [personShowing, setPersonShowing] = useState(null);
    const [addFormShowing, setAddFormShowing] = useState(false);

    function handleAddFriend(e, newFriend) {
        e.preventDefault();
        setFriends((prevState) => [...prevState, newFriend])
    }

    function handleOnSplit(e, info) {
        setFriends(prevState =>
            prevState.map(friend =>
                friend.id === info.id ? { ...friend, balance: info.amountOwed } : friend
            )
        );
        setPersonShowing(null);
    }

    function handleOnSelect(id) {
        const selectedPerson = friends.find((person) => person.id === id);

        setPersonShowing((prevPersonShowing) => {
            // If the same person is clicked, close the form
            if (prevPersonShowing && prevPersonShowing.id === id) {
                return null;
            }
            // If a different person is clicked, show the new one
            return selectedPerson;
        });
    }

    return (
        <div className="app">
            <div>
                <Sidebar friends={friends} openId={personShowing ? personShowing.id : null} onSelect={handleOnSelect} isShowing={addFormShowing} onToggle={() => setAddFormShowing(!addFormShowing)} />
                {addFormShowing && <AddFriendForm onClose={() => setAddFormShowing(false)} onAddFriend={handleAddFriend} />}
            </div>

            {personShowing && <SplitBillForm key={personShowing.id} person={personShowing} onSplit={handleOnSplit} />}
        </div>
    )
}

function Sidebar({friends, onSelect, isShowing, openId, onToggle}) {
    return (
        <div className="sidebar">
            <ul>
                {friends.map((friend) => (
                    <Person key={friend.id} data={friend} openId={openId} onSelect={onSelect} />
                ))}
            </ul>

            {!isShowing && <button className="button" onClick={onToggle}>Add friend</button>}
        </div>
    )
}

function Person({data, onSelect, openId}) {
    const isOpen = openId === data.id;

    return (
        <li>
            <img src={data.image} alt=""/>
            <h3>{data.name}</h3>
            <BalanceCalculation balance={data.balance} name={data.name}/>
            <button className="button" onClick={() => onSelect(data.id)}>{isOpen ? 'Close' : 'Select'}</button>
        </li>
    )
}

function BalanceCalculation({balance, name}) {
    let message = `You and ${name} are even`;
    let status = '';

    if (balance < 0) {
        message = `You owe ${name} £${Math.abs(balance)}`;
        status = 'red';
    }

    if (balance > 0) {
        message = `${name} owes you £${balance}`;
        status = 'green';
    }

    return (
        <p className={status}>
            {message}
        </p>
    )
}

function Input({children, type = 'number', val, onChange, isDisabled = false}) {
    return (
        <>
            <label>{children}</label>
            <input type={type} disabled={isDisabled} value={val} onChange={e => onChange(e.target.value)} />
        </>
    )
}

function AddFriendForm({onAddFriend, onClose}) {
    const [name, setName] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    function handleSubmit(e) {
        e.preventDefault();

         if (name && imageUrl) {
             const newPal = {
                 name: name,
                 image: imageUrl,
                 id: Date.now(),
                 balance: 0,
             }

            onAddFriend(e, newPal);
            setName('')
            setImageUrl('')
         }
    }

    return (
        <div>
            <form className="form-add-friend" onSubmit={e => handleSubmit(e)}>
                <Input type="text" val={name} onChange={setName}>👭 Friend name</Input>

                <Input type="text" val={imageUrl} onChange={setImageUrl}>🌄 Image URL</Input>

                <button className="button">Add</button>
            </form>
            <button className="button" onClick={onClose}>Close</button>
        </div>
    )
}

function SplitBillForm({person, onSplit}) {
    const [bill, setBill] = useState(null);
    const [expense, setExpense] = useState(null);
    const [payer, setPayer] = useState('you');

    let friendExpense = bill - expense;

    let amountOwed = friendExpense;

    if (payer !== 'you') {
        amountOwed = -expense;
    }

    function splitHandler(e) {
        e.preventDefault();

        const info = {
            amountOwed: amountOwed,
            id: person.id
        }

        onSplit(e, info);
    }

    return (
        <div>
            <form className="form-split-bill" onSubmit={splitHandler}>
                <h2>Split a bill with {person.name}</h2>
                <Input val={bill} onChange={setBill}>💰 Bill value</Input>

                <Input val={expense} onChange={setExpense}>🧍 Your expense</Input>

                <Input val={friendExpense} isDisabled={true}>👭 {person.name}'s expense</Input>

                <label>🤑 Who is paying the bill?</label>
                <select value={payer} onChange={e => setPayer(e.target.value)}>
                    <option value="you">You</option>
                    <option value={person.name}>{person.name}</option>
                </select>

                <button className="button">Split bill</button>
            </form>
        </div>
    )
}
