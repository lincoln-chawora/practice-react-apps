import {TravelItem} from "../../App.TravelList";
import React from "react";

interface StatsProps {
    items: TravelItem[]
}
const Stats: React.FC<StatsProps> = ({items}) => {
    if (!items.length) {
        return (
            <p className="stats">
                <em>Start adding some items to your packing list 🚀</em>
            </p>
        )
    }

    const numberOfItems = items.length;
    const numberOfPackedItems = items.filter((item) => item.packed).length;
    const percentageComplete = Math.round((numberOfPackedItems / numberOfItems) * 100);

    return (
        <footer className="stats">
            <em>
                {percentageComplete === 100 ? 'You got everything! Ready to go ✈️' :
                    `You have ${numberOfItems} items on your list, and you've already packed ${numberOfPackedItems} (${percentageComplete}%)`
                }
            </em>
        </footer>
    )
}

export default Stats