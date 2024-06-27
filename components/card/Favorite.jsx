import { StyleSheet, Text, Image, Pressable } from "react-native";
import React from "react";

const Favorite = () => {
  return (
    <Pressable
      style={styles.favorite}
      onPress={() => {
        console.log("added to favorite");
      }}
    >
      <Image
        contentFit="cover"
        source={require("../../assets/icons/heart.png")}
      />
    </Pressable>
  );
};

export default Favorite;

const styles = StyleSheet.create({
  favorite: {
   
    alignSelf: "flex-end",
  },
});
