import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Color,
  Border,
  FontFamily,
  FontSize,
  Padding,
} from "../../constants/GlobalStyles";
const PriceTag = ({ price }) => {
  return (
    <Text style={styles.priceSection}>
      <Text style={styles.actualPrice}>{price}rs </Text>

      <Text style={styles.dayTag}>/ day</Text>
    </Text>
  );
};

export default PriceTag;

const styles = StyleSheet.create({
  //price section
  priceSection: {
    marginTop: 15,
    marginBottom: 10,
    alignSelf: "flex-start",
    
  },

  actualPrice: {
    fontWeight: "700",
    fontFamily: FontFamily.SFBold,
    fontSize: FontSize.size_lg,
  },

  dayTag: {
    fontSize: FontSize.size_mini,
    color: Color.placeholderColor,
  },
});
