import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../constants/styles";

const SliderHeader = ({ leftText = "", rightText = "" }) => {
  return (
    <View style={{ marginTop: 20, marginBottom: 10, }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          // marginHorizontal: 20,
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: "SF-Pro-Text-Bold",
              fontSize: 18,
              color: Colors.textColor,
              letterSpacing: -0.5,
            }}
          >
            {leftText}
          </Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: "SF-Pro-Text-Medium",
              fontSize: 14,
              color: Colors.blueShadeColor,
              letterSpacing: -0.5,
            }}
          >
            {rightText}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SliderHeader;

const styles = StyleSheet.create({});
