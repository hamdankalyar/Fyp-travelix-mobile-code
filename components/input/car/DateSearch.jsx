import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import React from "react";
import { Color, Border } from "../../../constants/GlobalStyles";
import { Colors } from "../../../constants/styles";
import { FontAwesome5 } from "@expo/vector-icons";

const DateSearch = (props) => {
  return (
    <View style={styles.searchBar}>
      <FontAwesome5
        name="calendar-alt"
        size={24}
        color={Color.buttonAndIcons}
      />
      <Text style={styles.text}>11 Nov - 5 Dec</Text>
    </View>
  );
};

export default DateSearch;

const styles = StyleSheet.create({
  searchBar: {
    borderRadius: Border.br_53xl,
    // backgroundColor: Color.colorWhitesmoke,
    backgroundColor: "#ece9e9",
    borderColor: Color.colorGainsboro,
    borderWidth: 1,
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center", // Align items vertically in the center
    paddingHorizontal: 10, // Add some padding
  },

  text: {
    fontFamily: "SF-Pro-Text-Regular",
    fontSize: 16,
    color: Colors.textColor,
    marginLeft: 10,
    letterSpacing: 0.3,
  },
});
