import React, {ChangeEvent, useState} from "react";
import Item from "./Item";
import {TravelItem} from "../../App.TravelList";

interface PackingListProps {
    items: TravelItem[];
    onDeleteItem: (id: number) => void;
    onUpdateItem: (id: number) => void;
    onClearList: () => void;
}
const PackingList: React.FC<PackingListProps> = ({items, onDeleteItem, onUpdateItem, onClearList}) => {
    const [sortBy, setSortBy] = useState('input');

    function handleSort(e: ChangeEvent<HTMLSelectElement>) {
        setSortBy(e.target.value)
    }

    let sortedItems: TravelItem[];

    sortedItems = items;

    if (sortBy === 'description')
        sortedItems = items
            .slice()
            .sort((a, b) => a.description.localeCompare(b.description));

    if (sortBy === 'packed')
        sortedItems = items
            .slice()
            .sort((a, b) => Number(b.packed) - Number(a.packed));

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

export default PackingList