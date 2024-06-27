import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
// user: "661e95162bd4cf46c452b9da",
// bookedItem: {
//     item: "661be99dd65523488d78bf83",
//     price: 1500,
//     bookingDate: {
//         startDate: "2024-07-01",
//         finishDate: "2024-07-11"
//     }
// },
// bookedUserInfo: {
//     fullName: "John Doe",
//     cnic: "1234567890123",
// },
//ADD localhost address of your server
const API_URL = "http://192.168.18.41:3000";

const StripeApps = ({ route }) => {
    const [email, setEmail] = useState();
    const [cardDetails, setCardDetails] = useState();
    const { confirmPayment, loading } = useConfirmPayment();
    const { finalObj } = route.params;
    const testObj = {
        ...finalObj,
        paymentType: "Card",
        paymentMethod: {
            id: cardDetails?.paymentMethodId,
            last4: '4242',
            brand: 'visa'
        }
    }
    // // Converting startDate and finishDate to Date objects
    // finalObj.bookedItem.bookingDate.startDate = new Date(finalObj.bookedItem.bookingDate.startDate);
    // finalObj.bookedItem.bookingDate.finishDate = new Date(finalObj.bookedItem.bookingDate.finishDate);
    function checkDataTypes(obj, parentKey = '') {
        const dataTypeMap = {};
        for (const key in obj) {
            const fullPath = parentKey ? `${parentKey}.${key}` : key;
            if (obj[key] !== null && typeof obj[key] === 'object') {
                if (Array.isArray(obj[key])) {
                    dataTypeMap[fullPath] = 'array';
                    obj[key].forEach((item, index) => {
                        const results = checkDataTypes(item, `${fullPath}[${index}]`);
                        Object.assign(dataTypeMap, results);
                    });
                } else {
                    dataTypeMap[fullPath] = 'object';
                    Object.assign(dataTypeMap, checkDataTypes(obj[key], fullPath));
                }
            } else {
                dataTypeMap[fullPath] = typeof obj[key];
            }
        }
        return dataTypeMap;
    }

    function checkDataTypes(obj, parentKey = '') {
        const dataTypeMap = {};
        for (const key in obj) {
            const fullPath = parentKey ? `${parentKey}.${key}` : key;
            if (obj[key] !== null && typeof obj[key] === 'object') {
                if (Array.isArray(obj[key])) {
                    dataTypeMap[fullPath] = 'array';
                    obj[key].forEach((item, index) => {
                        const results = checkDataTypes(item, `${fullPath}[${index}]`);
                        Object.assign(dataTypeMap, results);
                    });
                } else {
                    dataTypeMap[fullPath] = 'object';
                    Object.assign(dataTypeMap, checkDataTypes(obj[key], fullPath));
                }
            } else {
                dataTypeMap[fullPath] = typeof obj[key];
            }
        }
        return dataTypeMap;
    }
    console.log("originalData", JSON.stringify(checkDataTypes(testObj), null, 2))
    useEffect(() => {

        console.log("int he stripe", JSON.stringify(finalObj, null, 2))
        // console.log(typeof (finalObj.bookingDate.startDate))
    }, [finalObj])
    // user: "661e95162bd4cf46c452b9da",
    // bookedItem: {
    //     item: "661be99dd65523488d78bf83",
    //     price: 1500,
    //     bookingDate: {
    //         startDate: "2024-07-01",
    //         finishDate: "2024-07-11"
    //     }
    // },
    // bookedUserInfo: {
    //     fullName: "John Doe",
    //     cnic: "1234567890123",
    // },
    // paymentType: "Card",
    // paymentMethod: {
    //     id: cardDetails?.paymentMethodId,
    //     last4: '4242',
    //     brand: 'visa'
    // }
    const fetchPaymentIntentClientSecret = async () => {
        const requestBody = {
            user: finalObj.user,
            bookedItem: {
                item: finalObj.bookedItem.item,
                price: 999990,
                bookingDate: finalObj.bookedItem.bookingDate
            },
            bookedUserInfo: {
                fullName: finalObj.bookedUserInfo.fullName,
                cnic: finalObj.bookedUserInfo.cnic,
            },
            paymentType: "Card",
            paymentMethod: {
                id: cardDetails?.paymentMethodId,
                last4: '4242',
                brand: 'visa'
            }
        };

        console.log("dummyData", JSON.stringify(checkDataTypes(requestBody), null, 2))
        try {
            const response = await fetch(`${API_URL}/api/vehicle/booking/mobile`, {
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
        if (!cardDetails?.complete || !email) {
            Alert.alert('Error', 'Please enter complete card details and email.');
            return;
        }
        const billingDetails = {
            email: email, // Include the email in the billing details
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
                Alert.alert('Success', 'Payment Successful');
                console.log('Payment successful', paymentIntent);
            }
        } catch (e) {
            console.error(e);
            Alert.alert('Payment Error', 'An unexpected error occurred');
        }
    };
    return (
        <View style={styles.container}>
            <TextInput
                autoCapitalize="none"
                placeholder="E-mail"
                keyboardType="email-address"
                onChange={value => setEmail(value.nativeEvent.text)}
                style={styles.input}
            />
            <CardField
                postalCodeEnabled={true}
                placeholder={{
                    number: "4242 4242 4242 4242",
                }}
                cardStyle={styles.card}
                style={styles.cardContainer}
                onCardChange={cardDetails => {
                    setCardDetails(cardDetails);
                }}
            />
            <Button onPress={handlePayPress} title="Pay" disabled={loading} />
        </View>
    );
};
export default StripeApps;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        margin: 20,
    },
    input: {
        backgroundColor: "#efefefef",

        borderRadius: 8,
        fontSize: 20,
        height: 50,
        padding: 10,
    },
    card: {
        backgroundColor: "#efefefef",
    },
    cardContainer: {
        height: 50,
        marginVertical: 30,
    },
});