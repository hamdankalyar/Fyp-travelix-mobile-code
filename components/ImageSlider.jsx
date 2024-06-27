import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Dimensions } from "react-native";

const { height, width } = Dimensions.get("window");

const ImageSlider = ({ itemsArray }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={{ backgroundColor: 'lightgray', justifyContent: "center", alignItems: "center" }}>
      <FlatList
        data={itemsArray}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onScroll={(event) => {
          const x = event.nativeEvent.contentOffset.x;
          setCurrentIndex(Math.round(x / width));
        }}
        renderItem={({ item }) => (
          <View style={{ height: height / 3, width: width }}>
            <Image
              source={{ uri: `${item}` }}
              style={{ height: "100%", width: "100%" }}
              resizeMode="contain"
            />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        style={{ height: height / 3 }} // Set the same height for the FlatList
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 20, // Adjust padding as needed
          position: "absolute",
          left: 0,
          right: 0, // This centers the dots container
          bottom: 0, // Adjust this to place the dots above the bottom edge as desired
        }}
      >
        {itemsArray.map((_, ind) => (
          <View
            key={ind}
            style={{
              height: 8,
              width: currentIndex === ind ? 16 : 8,
              borderRadius: currentIndex === ind ? 6 : 4,
              backgroundColor: currentIndex === ind ? "white" : "gray",
              margin: 4,
            }}
          />
        ))}
      </View>
    </View>
  );

};

export default ImageSlider;

const styles = StyleSheet.create({});
