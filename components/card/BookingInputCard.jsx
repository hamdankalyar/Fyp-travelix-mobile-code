

import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Modal from 'react-native-modal';
import { Iconify } from "react-native-iconify";
import { LinearGradient } from "expo-linear-gradient";

const BookingInputCard = ({ onDatesChange, onPriceChange, place, setRentDaysFunc, name }) => {
    const [isEditing, setIsEditing] = useState(false);

    //date validation 
    const currentDate = new Date();
    const nextDay = new Date();
    nextDay.setDate(currentDate.getDate() + 1);
    const [dates, setDates] = useState({
        startDate: currentDate.toISOString().split('T')[0],
        endDate: nextDay.toISOString().split('T')[0]
    });

    const [rentDays, setRentDays] = useState('1'); // Use a string for consistency with TextInput
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setRentDaysFunc(rentDays);
    }, [rentDays]);

    const handleEditPress = () => {
        setIsEditing(true);
    };

    const calculateEndDate = (startDate, rentDays) => {
        let endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + parseInt(rentDays));
        return endDate.toISOString().split('T')[0]; // Format the date back to YYYY-MM-DD
    };

    // const onDayPress = (day) => {
    //     const today = new Date();
    //     const selectedDate = new Date(day.dateString);
    //     if (selectedDate <= today) {
    //         setErrorMessage('Please select a date starting from tomorrow.');
    //     } else {
    //         setErrorMessage('');
    //         let endDate = calculateEndDate(day.dateString, rentDays);
    //         setDates({ startDate: day.dateString, endDate });
    //         onDatesChange(day.dateString, endDate);
    //         const price = parseInt(rentDays, 10) * place.price;
    //         onPriceChange(price);
    //     }
    // };
    const onDayPress = (day) => {
        const today = new Date().setHours(0, 0, 0, 0);
        const selectedDate = new Date(day.dateString).setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            setErrorMessage('Please select today or a future date.');
        } else {
            setErrorMessage('');
            let endDate = calculateEndDate(day.dateString, rentDays);
            setDates({ startDate: day.dateString, endDate });
            onDatesChange(day.dateString, endDate);
            const price = parseInt(rentDays, 10) * place.price;
            onPriceChange(price);
        }
    };

    const handleRentDaysChange = (newRentDays) => {
        const numericValue = parseInt(newRentDays, 10);
        let newEndDate;

        if (!isNaN(numericValue) && numericValue > 0) {
            setRentDays(newRentDays);
            newEndDate = calculateEndDate(dates.startDate, numericValue);
            setDates({ ...dates, endDate: newEndDate });
            onDatesChange(dates.startDate, newEndDate);
            const price = numericValue * place.price;
            onPriceChange(price);
        } else {
            setRentDays('');
            newEndDate = dates.endDate;
        }
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                locations={[0, 1]}
                colors={["#d9dddd", "rgb(240, 240, 240)"]}
                style={styles.CardGradientLayout}
            >
                <View style={styles.topSection}>
                    <Text style={styles.headingText}>{`${name} Rent Details`}  </Text>
                    <TouchableOpacity onPress={handleEditPress} style={styles.button}>
                        <Text style={styles.editText}>Edit</Text>
                    </TouchableOpacity>
                </View>

                {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

                <View style={styles.section}>
                    <Text style={styles.innerText}>Date</Text>
                    <Text>{`${dates.startDate} - ${dates.endDate}`}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.innerText}>Rent days</Text>
                    <Text>{rentDays}</Text>
                </View>

                {isEditing && (
                    <Modal
                        isVisible={isEditing}
                        onSwipeComplete={() => setIsEditing(false)}
                        swipeDirection={['down']}
                        style={styles.bottomModal}
                        backdropOpacity={0.5}
                        propagateSwipe={true} // Allows inner views to be scrollable
                    >
                        <View style={styles.modalContainer}>
                            <TouchableOpacity
                                style={styles.closeButton}
                                onPress={() => setIsEditing(false)}
                            >
                                <Iconify icon='carbon:close-outline' size={30} color='black' />
                            </TouchableOpacity>
                            <Text style={styles.innerText}>Rent Days</Text>
                            <TextInput
                                style={styles.input}
                                keyboardType="numeric"
                                value={rentDays}
                                onChangeText={handleRentDaysChange}
                            />
                            <Calendar
                                onDayPress={onDayPress}
                                markedDates={{
                                    [dates.startDate]: { startingDay: true, color: '#70DAD3', textColor: 'white' },
                                    [dates.endDate]: { endingDay: true, color: '#70DAD3', textColor: 'white' },
                                }}
                                markingType={'period'}
                                // minDate={new Date(Date.now() - 86400000).toISOString().split('T')[0]}
                                minDate={new Date().toISOString().split('T')[0]} // Disable past dates
                            />
                        </View>
                    </Modal>
                )}
            </LinearGradient>
        </View>
    );
};





const styles = StyleSheet.create({
    errorText: {
        color: 'red',
        textAlign: 'center',
        fontSize: 14,
        marginBottom: 5,
    },
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
    },
    CardGradientLayout: {
        padding: 20,
        borderRadius: 10,
    },
    topSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: "100%"
    },
    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    editText: {
        color: '#70DAD3',
        fontSize: 16,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 10,
    },
    button: {

    },
    modalContainer: {
        backgroundColor: 'white',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        paddingBottom: 20, // No padding at the bottom for the close button to sit at the edge
        alignItems: 'stretch', // Align children to stretch full width

    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 5,
        padding: 10,
        marginBottom: 20,
    },
    closeButton: {
        alignItems: 'flex-end',
        marginBottom: 10,
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,

    },
    innerText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 5,
    }


});


export default BookingInputCard;
