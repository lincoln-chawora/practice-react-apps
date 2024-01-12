import {useState} from "react";

export default function PackingList({items, onDeleteItem, onUpdateItem, onClearList}) {
    const [sortBy, setSortBy] = useState('input');

    function handleSort(e) {
        setSortBy(e.target.value)
    }

    let sortedItems;

    if (sortBy === 'input') sortedItems = items;
    if (sortBy === 'description')
        sortedItems = items
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description));

    if (sortBy === 'packed')
        sortedItems = items
            .slice()
            .sort((a, b) => Number(a.packed) - Number(b.packed));

    return (
        <div className="list">
            <ul>
                {sortedItems.map((item) => (
                    <Item
                        key={item.id}
                        item={item}
                        onUpdateItem={onUpdateItem}
                        onDeleteItem={onDeleteItem}
                    />
                ))}
            </ul>

            <div className="actions">
                <select value={sortBy} onChange={handleSort}>
                    <option value='input'>Sort by input order</option>
                    <option value='description'>Sort by description</option>
                    <option value='packed'>Sort by packed status</option>
                </select>
                <button onClick={onClearList}>Clear list</button>
            </div>
        </div>
    )
}

function Item ({item, onDeleteItem, onUpdateItem}) {
    return (
        <li>
            <input type="checkbox" checked={item.packed} value={item.packed} onChange={() => onUpdateItem(item.id)} />
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>
                {item.quantity} {item.description}
            </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    )
}