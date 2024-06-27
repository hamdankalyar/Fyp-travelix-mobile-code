

import { useState, useEffect, useCallback } from 'react';

const useTours = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trigger, setTrigger] = useState(0); // State to force re-fetch

  const fetchTours = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("https://travelix-backend-v2.vercel.app/api/tours");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setTours(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTours();
  }, [fetchTours, trigger]); // Added trigger to dependencies

  const refetch = () => {
    setTrigger(prev => prev + 1); // Increment trigger to re-run useEffect
  };

  const fetchTourById = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`https://travelix-backend-v2.vercel.app/api/tours/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const fetchTourCount = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://travelix-backend-v2.vercel.app/api/tours/count");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (e) {
      setError(e.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { tours, loading, error, fetchTourById, fetchTourCount, refetch };
};

export default useTours;
