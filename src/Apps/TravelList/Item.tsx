import {TravelItem} from "../../App.TravelList";
import React from "react";

interface ItemProps {
    item: TravelItem;
    onDeleteItem: (id: number) => void
    onUpdateItem: (id: number) => void
}
const Item: React.FC<ItemProps> = ({item, onDeleteItem, onUpdateItem}) => {
    return (
        <li>
            <input type="checkbox" checked={item.packed} value={item.packed.toString()} onChange={() => onUpdateItem(item.id)} />
            <span style={item.packed ? {textDecoration: "line-through"} : {}}>
            {item.quantity} {item.description}
        </span>
            <button onClick={() => onDeleteItem(item.id)}>❌</button>
        </li>
    )
}

export default Item;