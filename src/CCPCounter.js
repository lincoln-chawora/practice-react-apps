import {createContext, useContext, useState} from "react";

const CounterContext = createContext();

function CCPCounter({children}) {
    const [count, setCount] = useState(0);

    const increase = () => setCount(c => c + 1)
    const decrease = () => setCount(c => c - 1)

    return (
        <CounterContext.Provider value={{count, increase, decrease}}>
            <span>{children}</span>
        </CounterContext.Provider>
    );
}

function Count() {
    const {count} = useContext(CounterContext);
    return (
        <span>{count}</span>
    )
}
function Label({children}) {
    return (
        <span>{children}</span>
    )
}
function Increase({icon}) {
    const {increase} = useContext(CounterContext);
    return (
        <button onClick={increase}>{icon}</button>
    )
}
function Decrease({icon}) {
    const {decrease} = useContext(CounterContext);
    return (
        <button onClick={decrease}>{icon}</button>
    )
}

CCPCounter.Count = Count;
CCPCounter.Label = Label;
CCPCounter.Increase = Increase;
CCPCounter.Decrease = Decrease;

export default CCPCounter;
