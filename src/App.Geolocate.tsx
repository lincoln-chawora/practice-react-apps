import React, { useState } from "react";

interface Position {
    lat: number;
    lng: number;
}
const useGeolocation = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [position, setPosition] = useState<Position | undefined>(undefined);
    const [error, setError] = useState<string|null>(null);

    function getPosition(): void {
        if (!navigator.geolocation)
            return setError("Your browser does not support geolocation");

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos: GeolocationPosition) => {
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude,
                });
                setIsLoading(false);
            },
            (error: GeolocationPositionError) => {
                setError(error.message);
                setIsLoading(false);
            }
        );

    }

    return {position, error, isLoading, getPosition} as const;
}

const AppGeolocate: React.FC = () => {
    const [countClicks, setCountClicks] = useState<number>(0);
    const {position, error, isLoading, getPosition} = useGeolocation();

    function handleClick() {
        setCountClicks((count) => count + 1);
        getPosition();
    }

    return (
        <div>
            <button onClick={handleClick} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Get my position'}
            </button>

            {error && <p>{error}</p>}

            {!isLoading && !error && position && (
                <p>
                    Your GPS position:{" "}
                    <a
                        target="_blank"
                        rel="noreferrer"
                        href={`https://www.openstreetmap.org/#map=16/${position.lat}/${position.lng}`}
                    >
                        {position.lat}, {position.lng}
                    </a>
                </p>
            )}

            <p>You requested position {countClicks} times</p>
        </div>
    );
}

export default AppGeolocate;
