import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Color,
  Border,
  FontFamily,
  FontSize,
  Padding,
} from "../../constants/GlobalStyles";
const CardTitle = ({ title, city }) => {
  return (
    <View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text>{city}</Text>
    </View>
  );
};

export default CardTitle;

const styles = StyleSheet.create({
  //title
  cardTitle: {
    color: Color.text,
    fontSize: FontSize.size_base,
    fontFamily: FontFamily.SFSemibold,
    marginTop: 8,
    marginEnd: 4,
    fontWeight: 'bold',
  },
});
