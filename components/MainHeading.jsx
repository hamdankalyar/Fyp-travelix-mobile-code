import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/styles";
const MainHeading = ({ text }) => {
  return <Text style={styles.mainHeading}>{text}</Text>;
};

export default MainHeading;

const styles = StyleSheet.create({
  mainHeading: {
    fontFamily: "SF-Pro-Text-Bold",
    color: Colors.textColor,
    fontSize: 22,
    letterSpacing: -1,
  },
});
