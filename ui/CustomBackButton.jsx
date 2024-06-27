import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const CustomBackButton = ({ onPress, customStyle }) => {
  return (
    <View style={customStyle}>
      <Pressable onPress={onPress}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </Pressable>
    </View>
  );
};

export default CustomBackButton;

const styles = StyleSheet.create({});
