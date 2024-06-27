import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';

const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');


    const handleResetPassword = async () => {
        if (emailRegex.test(email)) {
            try {
                const response = await axios.post('https://travelix-backend-v2.vercel.app/api/auth/forget-password', {
                    email: email.toLowerCase(),
                });

                // Axios automatically checks for status code 200-299, so no need for `response.ok`
                Alert.alert("Success", "If the email is registered, you will receive a password reset code.");
                navigation.navigate('ResetPasswordScreen', { email: email.toLowerCase() });

            } catch (error) {
                console.error('Error:', error);
                // Check if the error response has data and message, otherwise use generic message
                const message = error.response && error.response.data ? error.response.data : 'Failed to reset password.';
                Alert.alert("Error", message);
            }
        } else {
            Alert.alert("Invalid Email", "Please enter a correct email address.");
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Forgot Password?</Text>
                <Text style={styles.subtitle}>Please enter your email address to receive a link to reset your password.</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    returnKeyType="done"
                />
                <Button
                    title="Reset Password"
                    onPress={handleResetPassword}
                    color="#1E90FF"
                />
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    innerContainer: {
        width: '80%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: '#333333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
});

export default ForgotPasswordScreen;
