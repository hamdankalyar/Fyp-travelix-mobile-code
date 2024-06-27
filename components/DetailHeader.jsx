import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ImageSlider from "./ImageSlider";

const DetailHeader = ({ images }) => {
  console.log("Images in header");
  // console.log(images);
  return (
    <View>
      <ImageSlider itemsArray={images} />
    </View>
  );
};

export default DetailHeader;

const styles = StyleSheet.create({});
