import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';

const SplashScreen = ({ onAnimationComplete }) => {
  const animationRef = useRef(null);

  useEffect(() => {
    if (animationRef.current) {
      animationRef.current.play();
    }
  }, []);

  return (
    <View style={styles.fullScreen}>
      <View style={styles.container}>
        <LottieView
          ref={animationRef}
          style={styles.animation}
          source={require('../assets/animation/splash.json')}
          loop={false}
          onAnimationFinish={onAnimationComplete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Set the background color to match your theme
  },
  container: {
    width: '80%', // Adjust the width percentage as needed
    aspectRatio: 1, // If your animation is square, keeping this aspect ratio will help
  },
  animation: {
    width: '100%',
    height: '100%',
  },
});

export default SplashScreen;
