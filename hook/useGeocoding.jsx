import { useState, useEffect } from 'react';
import axios from 'axios';

const useGeocoding = (address) => {
    const [coordinates, setCoordinates] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!address) {
            // If no address is provided, don't attempt to fetch coordinates
            setCoordinates(null);
            setError(null);
            return;
        }

        const fetchCoordinates = async () => {
            setIsLoading(true); // Start loading before the request
            const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

            try {
                const response = await axios.get(url);
                if (response.data && response.data.length > 0) {
                    const { lat, lon } = response.data[0];
                    setCoordinates({ latitude: parseFloat(lat), longitude: parseFloat(lon) });
                } else {
                    setError('No results found');
                    setCoordinates(null);
                }
            } catch (err) {
                console.error('Geocoding error:', err);
                setError('Geocoding error');
                setCoordinates(null);
            } finally {
                setIsLoading(false); // Stop loading after the request is finished
            }
        };

        fetchCoordinates();
    }, [address]);


return { coordinates, isLoading, error };

};

export default useGeocoding;
