import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  Color,
  Border,
  FontFamily,
  FontSize,
  Padding,
} from "../../constants/GlobalStyles";
const RatingSection = ({ rating, noOfReviews }) => {
  return (
    <View style={styles.ratingSection}>
      <Image
        contentFit="cover"
        source={require("../../assets/icons/star.png")}
      />
      <Text style={styles.ratingTextLayout}>
        <Text>{rating}</Text>
        <Text style={styles.ratingPersonsText}>{`(${noOfReviews})`}</Text>
      </Text>
    </View>
  );
};

export default RatingSection;

const styles = StyleSheet.create({
  ratingSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  ratingTextLayout: {
    fontSize: FontSize.size_xs,
    fontFamily: FontFamily.SFRegular,
    textAlign: "left",
    marginLeft: 3,
    color: Color.text,
  },
  ratingPersonsText: {
    color: Color.placeholderColor,
  },
});
