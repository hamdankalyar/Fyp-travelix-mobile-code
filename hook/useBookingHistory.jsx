import { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useBookingHistory = () => {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                // Retrieve the user data from AsyncStorage
                const userDataString = await AsyncStorage.getItem('UserData');
                const parsedUserData = JSON.parse(userDataString);
                if (!parsedUserData || !parsedUserData || !parsedUserData._id) {
                    throw new Error("User data is missing or incomplete.");
                }

                // Log the retrieved user data
                console.log("Retrieved UserData", parsedUserData);

             

                // Make the API request with the token in the headers
                const response = await axios.get(`https://travelix-backend-v2.vercel.app/api/bookings/user/${parsedUserData._id}`);

                // Update state with the response data
                setHistory(response.data);
                console.log("Booking data\n",JSON.stringify(response.data,null,2));
            } catch (err) {
                console.error("Error fetching booking history:", err);
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, []);

    return { history, loading, error };
};

export default useBookingHistory;
