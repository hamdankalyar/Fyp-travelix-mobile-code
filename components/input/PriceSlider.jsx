import React from "react";
import { Slider } from "@miblanchard/react-native-slider";
import { StyleSheet, View, Text } from "react-native";
import { Colors } from "../../constants/styles";

const PriceSlider = ({
  value,
  onValueChange,
  min = 1,
  max = 3000,
  step = 2,
  thumbTintColor = "#08adad",
  maximumTrackTintColor = "#ceebeb",
  minimumTrackTintColor = Colors.buttonAndIcons,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sliderText}>
        {value[0]} - {value[1]}
      </Text>
      <Slider
        value={value}
        onValueChange={onValueChange}
        maximumValue={max}
        minimumValue={min}
        thumbTintColor={thumbTintColor}
        maximumTrackTintColor={maximumTrackTintColor}
        minimumTrackTintColor={minimumTrackTintColor}
        step={step}
        animateTransitions={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  sliderText: {
    color: Colors.textColor,
    fontSize: 16,
    fontFamily: "SF-Pro-Text-Regular",
  },
});

export default PriceSlider;
