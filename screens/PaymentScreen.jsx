import { StyleSheet, Text, View } from "react-native";
import React from "react";
import StripeApp from "../components/StripeApp";
import { StripeProvider } from "@stripe/stripe-react-native";

const PUBLISHER_KEY =
  "pk_test_51ORDKNSIlpWRSFlR5pJArLeINJcVRLCT6o5LBS9PWmS3HUYF4sUE1xIHYrFDbRsaGJXZcvnuiTqitgn26cp7hSfe00VT3AMWC1";

const PaymentScreen = () => {
  return (
    <StripeProvider publishableKey={PUBLISHER_KEY}>
      <StripeApp />
    </StripeProvider>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({});
