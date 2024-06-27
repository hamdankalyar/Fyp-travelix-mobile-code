import { Alert, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState } from "react";
import LargButton from "../ui/LargButton";
import { Input, VStack } from "native-base";
import { CardField, useConfirmPayment } from "@stripe/stripe-react-native";
const SECRET_KEY =
  "sk_test_51ORDKNSIlpWRSFlRPShCSjzfohDP32IWukAEvuujm6DHmeW2OR7103j7JR7A4DD5Eh09pX5KtnHrV60pwulcpzWY00znxH6v9B";
const StripeApp = () => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();

  const fetchPayementClientSecret = async () => {
    console.log("Before Request");
    const response = await fetch(
      "http://192.168.96.1:3000/create-payment-intent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("After Request");

    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };
  const handlePayPress = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert("Please enter complete card details");
      return;
    }

    const billingDetails = {
      email: email,
    };

    try {
      const { clientSecret, error } = await fetchPayementClientSecret();

      if (error) {
        console.log("Unable to process payment.");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
        });
        if (error) {
          console.error("Payment Confirmation Error", error);
          Alert.alert(`Payment Confirmation Error: ${error.message}`);
        } else if (paymentIntent) {
          Alert.alert("Payment Successful");
          console.log(paymentIntent);
          // savePaymentDetailsToFirebase(paymentIntent);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const savePaymentDetailsToFirebase = (paymentIntent) => {
    console.log(paymentIntent);
    // // Save non-sensitive payment details to Firebase
    // db.collection("payments")
    //   .add({
    //     id: paymentIntent.id,
    //     amount: paymentIntent.amount,
    //     // Include other non-sensitive details you might need
    //   })
    //   .then(() => console.log("Payment details saved to Firebase"))
    //   .catch((error) =>
    //     console.error("Error saving payment details to Firebase", error)
    //   );
  };
  return (
    <View style={styles.container}>
      <VStack space={4} alignItems="flex-start">
        <View style={{ width: "100%", display: "flex", gap: 10 }}>
          <Text style={styles.labelText}>Email</Text>
          <Input
            variant="rounded"
            placeholder="@gmail.com"
            value={email}
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        <View style={{ width: "100%", display: "flex", gap: 10 }}>
          <Text style={styles.labelText}>Card</Text>
          <CardField
            postalCodeEnabled={true}
            placeholder={{
              number: "4242 4242 4242 4242",
            }}
            cardStyle={styles.card}
            style={styles.cardContainer}
            onCardChange={(cardDetails) => {
              setCardDetails(cardDetails);
            }}
          />
        </View>
        
      </VStack>
    </View>
  );
};

export default StripeApp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
});
