import React, { useState } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const LargeButton = ({ text, onPress }) => {
  const [isPressed, setIsPressed] = useState(false);

  // Define the gradient colors for the normal and pressed states
  const normalGradient = ['#70DAD3', '#35B5AE'];
  const pressedGradient = ['#35B5AE', '#70DAD3']; // Example pressed colors, change as desired

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)} // When the press is initiated
      onPressOut={() => setIsPressed(false)} // When the press is released
      onPress={onPress}
      style={{width: '100%'}}
    >
      <LinearGradient
        style={styles.mainBtn}
        locations={[0, 1]}
        colors={isPressed ? pressedGradient : normalGradient} // Change gradient based on isPressed
      >
        <Text style={styles.btnText}>{text}</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default LargeButton;

const styles = StyleSheet.create({
  mainBtn: {
    width: '100%',
    padding: 14,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  btnText: {
    color: 'white', // Assuming you want the text color to be white
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Medium', // Make sure the font family is configured correctly
  },
});
