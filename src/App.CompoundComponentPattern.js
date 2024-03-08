import CCPCounter from "./CCPCounter";

export default function AppCompoundComponentPattern() {
    return (
        <div>
            <h1>Compound Component Pattern</h1>
            {/*<CCPCounter*/}
            {/*    iconIncrease="+"*/}
            {/*    iconDecrease="-"*/}
            {/*    label="My NOT so flexible counter"*/}
            {/*    hideLabel={false}*/}
            {/*    hideIncrease={false}*/}
            {/*    hideDecrease={false}*/}
            {/*/>*/}

            <CCPCounter>
                <CCPCounter.Label>By gawd it works!</CCPCounter.Label>
                <CCPCounter.Decrease icon="-" />
                <CCPCounter.Increase icon="+" />
                <CCPCounter.Count />
            </CCPCounter>
        </div>
    );
}
