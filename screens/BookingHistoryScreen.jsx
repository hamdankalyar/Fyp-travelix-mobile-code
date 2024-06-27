

import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
} from 'react-native';
import useBookingHistory from '../hook/useBookingHistory';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome } from '@expo/vector-icons';
import BookingCard from '../components/card/BookingCard';

const BookingHistoryScreen = ({ navigation }) => {
    const { history, loading, error } = useBookingHistory();
    const [sortedHistory, setSortedHistory] = useState([]);
    const [isSortedDesc, setIsSortedDesc] = useState(true);  // Default to newest first

    useEffect(() => {
        if (history && history.length > 0) {
            const sortedData = [...history].sort((a, b) => {
                const dateA = new Date(a.bookingAt);
                const dateB = new Date(b.bookingAt);
                return isSortedDesc ? dateB - dateA : dateA - dateB;
            });
            setSortedHistory(sortedData);
        } else {
            setSortedHistory([]);  // Ensure to clear sorted history if no bookings
        }
    }, [history, isSortedDesc]);

    const handleBackPress = () => {
        navigation.goBack();
    };

    const handleSortPress = () => {
        setIsSortedDesc(!isSortedDesc);  // Toggle sorting order
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                    <Icon name="arrow-back" size={27} color="#000" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Booking History</Text>
                <TouchableOpacity onPress={handleSortPress} style={styles.sortButton}>
                    <FontAwesome name="sort" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {loading ? (
                <ActivityIndicator size="large" color="#1E90FF" />
            ) : error ? (
                <Text style={styles.errorText}>Error fetching bookings: {error.message}</Text>
            ) : (
                <FlatList
                    data={sortedHistory}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => <BookingCard booking={item} />}
                    style={styles.list}
                    contentContainerStyle={styles.listContainer}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        paddingVertical: 30,
        position: 'relative',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    backButton: {
        position: 'absolute',
        left: 30,
    },
    sortButton: {
        position: 'absolute',
        right: 30,
    },
    list: {
        backgroundColor: '#fff',
    },
    listContainer: {
        padding: 8,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        margin: 20,
    },
});

export default BookingHistoryScreen;
