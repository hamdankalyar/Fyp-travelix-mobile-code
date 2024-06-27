

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useHotels = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState(null);
    const [trigger, setTrigger] = useState(0); // State to force re-fetch

    const fetchHotels = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://travelix-backend-v2.vercel.app/api/hotels');
            setHotels(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchTotalCount = useCallback(async () => {
        try {
            const response = await axios.get('https://travelix-backend-v2.vercel.app/api/hotels/count');
            setTotalCount(response.data.totalCount);
        } catch (err) {
            setError(err);
        }
    }, []);

    useEffect(() => {
        fetchHotels();
        fetchTotalCount();
    }, [fetchHotels, fetchTotalCount, trigger]); // Added trigger to dependencies

    const refetch = () => {
        setTrigger(prev => prev + 1); // Increment trigger to re-run useEffect
    };

    const fetchHotelById = async (id) => {
        try {
            const response = await axios.get(`https://travelix-backend-v2.vercel.app/api/hotels/${id}`);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    return { hotels, loading, totalCount, error, fetchHotelById, refetch };
};

export default useHotels;
