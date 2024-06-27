import { Pressable, ScrollView, StyleSheet, Text, View, Alert, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import BankCard from "../../components/card/BankCard";
import LargeButton from "../../ui/LargButton";
import TravellerInfoCard from '../../components/card/TravellerInfoCard'; // Assume these components exist
import UserTravelCard from '../../components/card/UserTravelCard';
import AsyncStorage from "@react-native-async-storage/async-storage";
import TravelCard from "../../components/card/ModuleCards/TravelCards";
import TourPriceDetailsCard from "../../components/card/priceCards/TourPriceDetailsCard";
import UserDetailsCard from "../../components/card/UserDetailCard";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { LinearGradient } from "expo-linear-gradient";

const API_URL = "https://travelix-backend-v2.vercel.app";
const TourBookingScreen = ({ route, navigation }) => {
    const { place } = route.params;
    // console.log("place", JSON.stringify(place, null, 2));
    const { confirmPayment, loading } = useConfirmPayment();
    const [modalVisible, setModalVisible] = useState(false);
    const [stripeCardDetails, setStripeCardDetails] = useState();
    const [noOfPersons, setNoOfPersons] = useState(1);
    const [finalObj, setFinalObj] = useState({
        user: '',
        bookedItem: {
            item: place._id || '',
            price: place.price || 0,
            tourDate: {
                startDate: place.availableDates[0].startDate.slice(0, 10),
                finishDate: place.availableDates[0].finishDate.slice(0, 10)
            },
            numberOfPersons: 1,
        },
        bookedUserInfo: {
            fullName: '',
            cnic: '',
            gender: 'Male',
        },

    });

    const [userDetails, setUserDetails] = useState({
        cnic: '',
        gender: ''
    });

    const handleNoOfPersonsChange = (value) => {
        setNoOfPersons(value + 1)
        const persons = value + 1;
        setFinalObj((prevFinalObj) => ({
            ...prevFinalObj,
            bookedItem: {
                ...prevFinalObj.bookedItem,
                numberOfPersons: persons,
            },
        }));


    };
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
                gender: details.gender,

            },
        }));

        console.log('Final Object:', finalObj);
    };

    useEffect(() => {
        console.log('Final Object here:', JSON.stringify(finalObj, null, 2));

    }, [finalObj])




    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDataString = await AsyncStorage.getItem('UserData');
                if (userDataString) {
                    const parsedUserData = JSON.parse(userDataString);
                    console.log("Retrieved UserData", parsedUserData);

                    setFinalObj({
                        ...finalObj,
                        user: parsedUserData._id, // Make sure this path matches the actual data structure
                        bookedItem: {
                            ...finalObj.bookedItem,
                            item: place._id, // Uncomment and use actual ID
                        },
                        bookedUserInfo: {
                            fullName: parsedUserData.name, // Make sure this path matches the actual data structure
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


    const saveTravellerDetails = (travellerData) => {
        finalObj.travellersInfo = [];
        const newTravellersInfo = finalObj.travellersInfo;

        travellerData.forEach(traveller => {
            newTravellersInfo.push(traveller); // Push each object from travellerData array to newTravellersInfo array
        });


        setFinalObj(prev => ({
            ...prev,
            travellersInfo: newTravellersInfo,
            bookedItem: {
                ...prev.bookedItem,
            }

        }));

    };


    const onpress = () => {
        navigation.navigate("DoneAnimationScreen");
    };


    const closeModal = () => {
        setModalVisible(false);
    };
    const handleModalContentPress = (event) => {
        // Prevents the press event from reaching the overlay
        event.stopPropagation();
    };

    //payment all code 
    const fetchPaymentIntentClientSecret = async () => {
        const requestBody = {
            ...finalObj,
            paymentType: "Card",
            paymentMethod: {
                id: stripeCardDetails?.paymentMethodId,
                last4: '4242',
                brand: 'visa'
            }
        };
        console.log("Request Body being sent to API:", JSON.stringify(requestBody, null, 2));
        try {
            const response = await fetch(`${API_URL}/api/bookings/mobile`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.statusText}`);
            }

            const jsonResponse = await response.json();
            return jsonResponse; // Directly return the parsed JSON response
        } catch (error) {
            console.error('Error fetching client secret:', error);
            Alert.alert('Error', error.message);
            return null; // Return null to indicate failure
        }
    };

    const handlePayPress = async () => {
        if (!stripeCardDetails?.complete) {
            Alert.alert('Error', 'Please enter complete card details.');
            return;
        }
        const billingDetails = {
            email: "hamdan@cui.com", // Include the email in the billing details
        };

        try {
            const response = await fetchPaymentIntentClientSecret();
            if (response?.error) {
                console.log('Unable to process payment:', response.error);
                Alert.alert('Payment Error', response.error);
                return;
            }

            const { clientSecret } = response;
            const { paymentIntent, error } = await confirmPayment(clientSecret, {
                paymentMethodType: 'Card',
                billingDetails: billingDetails,
            });

            if (error) {
                console.log('Payment confirmation error:', error);
                Alert.alert('Payment Error', error.message);
            } else {
                navigation.navigate('DoneAnimationScreen');
                console.log('Payment successful', paymentIntent);
            }
        } catch (e) {
            console.error(e);
            Alert.alert('Payment Error', 'An unexpected error occurred');
        }
    };



    useEffect(() => {
        const handlePriceChange = () => {
            setFinalObj((prevFinalObj) => ({
                ...prevFinalObj,
                bookedItem: {
                    ...prevFinalObj.bookedItem,
                    price: noOfPersons * place.price,
                    numberOfPersons: noOfPersons,
                },
            }));
        };
        handlePriceChange();

        console.log(noOfPersons, 'Persons:', noOfPersons);

    }, [noOfPersons])

    return (
        <View
            style={{
                paddingBottom: 25,
            }}
        >
            {/* <View style={styles.container}>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                    style={styles.modal}
                >
                    <Pressable style={styles.modalOverlay} onPress={closeModal}>
                        <View style={styles.centeredView}>
                            <Pressable style={styles.modalView} onPress={handleModalContentPress}>

                                <Pressable style={styles.closeIcon} onPress={closeModal}>
                                    <Text style={styles.closeIconText}>X</Text>
                                </Pressable>
                                <Text style={styles.modalText}>Enter Card Details</Text>
                                <CardField
                                    postalCodeEnabled={true}
                                    placeholder={{
                                        number: "4242 4242 4242 4242",
                                    }}
                                    cardStyle={styles.card}
                                    style={styles.cardContainer}
                                    onCardChange={cardDetails => {
                                        setStripeCardDetails(cardDetails);
                                    }}
                                />

                            </Pressable>
                        </View>

                    </Pressable>
                </Modal>

            </View> */}
            <ScrollView>
                {place && (
                    <View style={styles.cardStyle}>
                        <TravelCard cardData={[place]} />
                    </View>
                )}


                {place.personsAllowed !== 1 && (
                    <TravellerInfoCard
                        onSave={saveTravellerDetails}
                        handleNoOfPersons={handleNoOfPersonsChange}
                        persons={place.personsAllowed - 1}
                    />
                )}

                <UserDetailsCard setUserDetail={handleSetUserDetails} />

                <TourPriceDetailsCard noOfPerson={noOfPersons} price={place.price} />
                {/* <BankCard navigation={navigation} setModalVisible={setModalVisible} /> */}
                <View style={styles.cardBank}>
                    <LinearGradient
                        locations={[0, 1]}
                        colors={["#d9dddd", "rgb(240, 240, 240)"]}
                        style={styles.CardGradientLayout}
                    >
                        <Text style={styles.modalText}>Enter Card Details</Text>
                        <CardField
                            postalCodeEnabled={true}
                            placeholder={{
                                number: "4242 4242 4242 4242",
                            }}
                            cardStyle={styles.card}
                            style={styles.cardContainer}
                            onCardChange={cardDetails => {
                                setStripeCardDetails(cardDetails);
                            }}
                        />
                    </LinearGradient>
                </View>
                <View style={styles.btn}>

                    <LargeButton text="Pay now" onPress={handlePayPress} />

                </View>
            </ScrollView>
        </View>
    );
};

export default TourBookingScreen;

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
    btn: {
        marginTop: 20,
        width: "90%",
        alignItems: "center",
        alignSelf: "center",
    },
    CardGradientLayout: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
      },
      modalText: {

        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    
      },
});




