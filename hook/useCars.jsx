


import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const useCars = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [totalCount, setTotalCount] = useState(0);
    const [error, setError] = useState(null);
    const [trigger, setTrigger] = useState(0); // State to force re-fetch

    const fetchCars = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://travelix-backend-v2.vercel.app/api/vehicle');
            setCars(response.data);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchTotalCount = useCallback(async () => {
        try {
            const response = await axios.get('https://travelix-backend-v2.vercel.app/api/vehicle/count');
            setTotalCount(response.data.totalCount);
        } catch (err) {
            setError(err);
        }
    }, []);

    useEffect(() => {
        fetchCars();
        fetchTotalCount();
    }, [fetchCars, fetchTotalCount, trigger]); // Added trigger to dependencies

    const refetch = () => {
        setTrigger(prev => prev + 1); // Increment trigger to re-run useEffect
    };

    const fetchCarById = async (id) => {
        try {
            const response = await axios.get(`https://travelix-backend-v2.vercel.app/api/vehicle/${id}`);
            return response.data;
        } catch (err) {
            setError(err);
        }
    };

    return { cars, loading, totalCount, error, fetchCarById, refetch };
};

export default useCars;

