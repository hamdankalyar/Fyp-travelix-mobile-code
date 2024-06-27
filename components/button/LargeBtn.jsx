import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";

const LargeBtn = ({ title, handlePress, backgroundColor, border }) => {
  // Determine text color based on the background color
  const textColor = backgroundColor === '#4e9994' ? 'white' : 'black';
  const borderStyles = border ? styles.border : null;
  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        {
            backgroundColor: backgroundColor,
            opacity: pressed ? 0.7 : 1, // Lower the opacity when pressed
        },
        styles.mainBtn,
        borderStyles,
      ]}
    >
      <Text style={[styles.btnText, { color: textColor }]}>{title}</Text>
    </Pressable>
  );
};

export default LargeBtn;

const styles = StyleSheet.create({
  mainBtn: {
    width: "100%",
    padding: 14,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  btnText: {
    fontFamily: "SF-Pro-Text-Medium",
    fontSize: 14,
  },
  border: {
    borderWidth: 1, // You can adjust the width as needed
    borderColor: 'black', // You can adjust the color as needed
  },
});
