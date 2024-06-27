

import { Pressable, ScrollView, StyleSheet, Text, View, Alert, Modal } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import CarCard from "../../components/card/ModuleCards/CarCards";
import BookingInputCard from "../../components/card/BookingInputCard";
import PriceDetailsCard from "../../components/card/priceCards/PriceDetailsCard";
import BankCard from "../../components/card/BankCard";
import LargeButton from "../../ui/LargButton";
import UserDetailsCard from "../../components/card/UserDetailCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
import { LinearGradient } from "expo-linear-gradient";
const API_URL = "https://travelix-backend-v2.vercel.app";
const MyBookingScreen = ({ route, navigation }) => {
  const { place } = route.params;
  const [modalVisible, setModalVisible] = useState(false);
  const [stripeCardDetails, setStripeCardDetails] = useState();

  const { confirmPayment, loading } = useConfirmPayment();

  const currentDate = new Date();
  const nextDay = new Date(currentDate);
  nextDay.setDate(currentDate.getDate() + 1);

  const [startDate, setStartDate] = useState(currentDate.toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(nextDay.toISOString().split('T')[0]);

  const [finalObj, setFinalObj] = useState({
    user: '',
    bookedItem: {
      item: place._id, // You might have an initial value for the item
      price: place.price, // You might have an initial value for the price
      bookingDate: {
        startDate: startDate,
        finishDate: endDate,
      },
    },
    bookedUserInfo: {
      fullName: '', // Add all fields that will come from UserDetailsCard
      cnicNumber: '',
      gender: '',
    },

  },
  );

  const [rentDays, setRentDays] = useState('1')
  const [userDetails, setUserDetails] = useState({
    cnicNumber: '',
    gender: '',
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
        cnicNumber: details.cnicNumber,
        gender: details.gender,
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
    console.log("Stripe Card Details", stripeCardDetails);
  }, [finalObj, rentDays, stripeCardDetails])

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataString = await AsyncStorage.getItem('UserData');
        console.log("object",)
        if (userDataString) {
          const parsedUserData = JSON.parse(userDataString);
          console.log("Retrieved UserData", parsedUserData);



          setFinalObj((prevFinalObj) => ({
            user: parsedUserData._id, // Make sure this path matches the actual data structure
            bookedItem: {
              item: place._id, // Uncomment and use actual ID
              ...prevFinalObj.bookedItem,
            },
            bookedUserInfo: {
              fullName: parsedUserData.name, // Make sure this path matches the actual data structure
            },
            paymentType: "Credit Card",
          }
          ));
        }
      } catch (e) {
        console.error('Failed to fetch or parse UserData', e);
      }
    };

    fetchUserData();
  }, []); // The empty array ensures this effect runs once on mount




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
        // Alert.alert('Success', 'Payment Successful');
        navigation.navigate('DoneAnimationScreen');
        console.log('Payment successful', paymentIntent);
      }
    } catch (e) {
      console.error(e);
      Alert.alert('Payment Error', 'An unexpected error occurred');
    }
  };
  return (
    <View
      style={{
        paddingBottom: 25,
      }}
    >
      <View style={styles.container}>

      </View>
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
          name="Car"
        />
        <PriceDetailsCard rentDays={rentDays} price={place.price} />
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

    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,

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
  cardBank: {

  },
  CardGradientLayout: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
  }
});
