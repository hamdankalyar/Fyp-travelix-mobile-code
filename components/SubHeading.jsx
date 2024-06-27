import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/styles";
const SubHeading = ({ text }) => {
  return <Text style={styles.subHeading}>{text}</Text>;
};

export default SubHeading;

const styles = StyleSheet.create({
  subHeading: {
    fontFamily: "SF-Pro-Text-Medium",
    color: Colors.subText,
    fontSize: 15,
    paddingTop: 5,
    lineHeight: 20,
    letterSpacing: -0.5,
  },
});
