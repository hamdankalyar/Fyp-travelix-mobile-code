import { Pressable, ScrollView, StyleSheet, Text, View, Alert, Modal } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CarCard from "../../components/card/ModuleCards/CarCards";
import BookingInputCard from "../../components/card/BookingInputCard";
import PriceDetailsCard from "../../components/card/PriceDetailsCard";

import LargeButton from "../../ui/LargButton";
import UserDetailsCard from "../../components/card/UserDetailCard";
import AsyncStorage from "@react-native-async-storage/async-storage";



const MyBookingScreen = ({ route, navigation }) => {
    const { place } = route.params;



    const [finalObj, setFinalObj] = useState({
        user: '',
        bookedItem: {
            item: '', // You might have an initial value for the item
            price: 0, // You might have an initial value for the price
            bookingDate: {
                startDate: '',
                finishDate: '',
            },
        },
        bookedUserInfo: {
            fullName: '', // Add all fields that will come from UserDetailsCard
            cnic: '',
        },

    },
    );

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [rentDays, setRentDays] = useState('1')
    const [userDetails, setUserDetails] = useState({

        cnic: '',
        phoneNumber: '',
    });

    const handleSetUserDetails = (details) => {
        setUserDetails(details);
        console.log('User Details Saved:', details);
        setFinalObj((prevFinalObj) => ({
            ...prevFinalObj,
            bookedItem: {
                ...prevFinalObj.bookedItem,
            },
            bookedUserInfo: {
                ...prevFinalObj.bookedUserInfo,
                cnic: details.cnicNumber,
                // phoneNumber: details.phoneNumber,
            },
        }));

        console.log('Final Object:', finalObj);
    };

    const handleDatesChange = (startDate, endDate) => {
        setStartDate(startDate);
        setEndDate(endDate);
        setFinalObj((prevFinalObj) => ({
            ...prevFinalObj,
            bookedItem: {
                ...prevFinalObj.bookedItem,
                bookingDate: {
                    startDate,
                    finishDate: endDate,
                },
            },
        }));
    };

    const handlePriceChange = (newPrice) => {
        setFinalObj((prevFinalObj) => ({
            ...prevFinalObj,
            bookedItem: {
                ...prevFinalObj.bookedItem,
                price: newPrice,
            },
        }));
    };
    useEffect(() => {
        console.log('Final Object here:', finalObj);
        console.log("Rentdays", rentDays)

    }, [finalObj, rentDays])

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('UserData');
                if (userDataString) {
                    const parsedUserData = JSON.parse(userDataString);
                    console.log("Retrieved UserData", parsedUserData);



                    setFinalObj({
                        user: parsedUserData.data._id, // Make sure this path matches the actual data structure
                        bookedItem: {
                            item: place._id, // Uncomment and use actual ID

                        },
                        bookedUserInfo: {
                            fullName: parsedUserData.data.name, // Make sure this path matches the actual data structure
                        },

                    }
                    );
                }
            } catch (e) {
                console.error('Failed to fetch or parse UserData', e);
            }
        };

        fetchUserData();
    }, []); // The empty array ensures this effect runs once on mount


    const onpress = () => {
        navigation.navigate("StripeTest", { finalObj: finalObj });
    };


    return (
        <View
            style={{
                paddingBottom: 25,
            }}
        >

            <ScrollView>
                {place && (
                    <View style={styles.cardStyle}>
                        <CarCard cardData={[place]} />
                    </View>
                )}
                <UserDetailsCard setUserDetail={handleSetUserDetails} />
                <BookingInputCard
                    onDatesChange={handleDatesChange}
                    onPriceChange={handlePriceChange}
                    place={place} // You need to pass the place object here as well
                    setRentDaysFunc={setRentDays}
                />
                <PriceDetailsCard rentDays={rentDays} price={place.price} />


                <Pressable onPress={onpress} >
                    <Text>Proceed</Text>
                </Pressable>
                {/* <LargeButton text="Proceed" onPress={onpress} /> */}

            </ScrollView>
        </View >
    );
};

export default MyBookingScreen;
const styles = StyleSheet.create({
    cardStyle: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    button: {
        marginTop: 20,
        width: "90%",
        alignSelf: "center",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%', // Set the width to 80% of the screen width
        alignSelf: 'center', // Center the modal view horizontally
    },
    cardContainer: {
        height: 50,
        width: '100%', // Ensure the CardField takes the full width of the modal
        backgroundColor: "white", // Set a contrasting background color
        marginVertical: 20,
    },
    card: {
        // Remove backgroundColor or set it to a contrasting color other than black
        color: 'black', // Set text color if necessary
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },

    modal: {
        width: "100%",
        flex: 1,
        height: "100%",
    },
    closeIcon: {
        position: 'absolute',
        top: 10,
        right: 10,
        padding: 10
    },
    closeIconText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)" // Semi-transparent background
    },
});
