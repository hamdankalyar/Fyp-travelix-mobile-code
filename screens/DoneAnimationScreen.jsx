

import React, { useEffect, useRef } from 'react';
import { BackHandler, Button, StyleSheet, Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

const DoneAnimationScreen = ({ navigation }) => {
    const animationRef = useRef(null);

    useEffect(() => {
        if (animationRef.current) {
            animationRef.current.play();
        }

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => {
                // Prevent default behavior (going back)
                return true;
            }
        );

        return () => backHandler.remove();
    }, []);

    const moveToMainScreen = () => {
        navigation.navigate('BottomTabs');
    };

    return (
        <View style={styles.fullScreen}>
            <View style={styles.container}>
                <LottieView
                    ref={animationRef}
                    style={styles.animation}
                    source={require('../assets/animation/done.json')}
                    loop={true}
                />
                <Text style={styles.text}>Booking Successful</Text>
                <Button title="Go to Main Screen" onPress={moveToMainScreen} />
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
    text: {
        fontSize: 30,
        textAlign: 'center',
        marginTop: 0,
        fontWeight: 'bold'
    }
});

export default DoneAnimationScreen;
