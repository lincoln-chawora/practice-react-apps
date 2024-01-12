import {useState} from "react";
import Logo from "./components/Logo";
import Stats from "./components/Stats";
import Form from "./components/Form";
import PackingList from "./components/PackingList";
import './index.travel.css';

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 3, description: "Tooth brush", quantity: 1, packed: true },
];

export default function AppTravelList() {
    const [items, setItems] = useState(initialItems);

    function handleAddItems(item) {
        // Get current items and then update items array.
        setItems((items) => [...items, item]);
    }

    function handleDeleteItem(id) {
        setItems((items) => (
            items.filter((item) => item.id !== id)
        ));
    }

    function handleUpdateItem(id) {
        setItems(prevItems =>
            // Get current object (prevItems) then if the id matches the supplied id, get everything in that item and
            // update the packed value to be the opposite of the current value, otherwise return the whole item.
            prevItems.map(item =>
                item.id === id ? { ...item, packed: !item.packed } : item
            )
        );
    }

    function handleClearList() {
        const confirmed = window.confirm('Are you sure you want to delete all items?')

        if (confirmed) setItems([]);
    }

    return (
        <div className="app">
            <Logo />
            <Form onAddItems={handleAddItems}/>
            <PackingList
                items={items}
                onDeleteItem={handleDeleteItem}
                onUpdateItem={handleUpdateItem}
                onClearList={handleClearList}
            />
            <Stats items={items} />
        </div>
    )
}

