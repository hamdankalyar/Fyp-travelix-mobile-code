

import { StyleSheet, View, Text, Pressable, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import React, { useState } from "react";
import { Input, VStack } from "native-base";
import LargeButton from "../ui/LargButton"; // Ensure this matches the actual component name
import { Colors } from "../constants/styles";
const SignUpForm = ({ onAuthenticate }) => {
  const [signUpData, setSignUpData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Handler for changes in input fields
  const handleSignUpChange = (fieldName, value) => {
    // Automatically convert email input to lowercase
    const formattedValue = fieldName === "email" ? value.toLowerCase() : value;
    setSignUpData(prevData => ({
      ...prevData,
      [fieldName]: formattedValue,
    }));
  };

  const handleSubmit = () => {
    const { name, phone, email, password, confirmPassword } = signUpData;
    const nameIsValid = name.trim().length > 0;
    const phoneIsValid = phone.trim().length >= 8;  // Assuming phone number length validation

    // Regex for validating the email
    const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const emailIsValid = emailRegex.test(email);

    const passwordIsValid = password.length >= 8;
    const passwordsMatch = password === confirmPassword;

    if (!nameIsValid || !phoneIsValid || !emailIsValid || !passwordIsValid || !passwordsMatch) {
      let message = "Please check your entered credentials.";
      if (!phoneIsValid) message = "Invalid phone format. Please enter a valid phone number.";
      if (!emailIsValid) message = "Invalid email format. Please enter a valid email address.";
      Alert.alert("Invalid Credentials!", message);
      console.log('Form Submission Data:', signUpData);
      return;
    }

    onAuthenticate({ name, email, password, phone });
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 100}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <VStack space={4} alignItems="flex-start">
          <InputField label="Username" inputProps={{ placeholder: "John Doe", onChangeText: (value) => handleSignUpChange("name", value), value: signUpData.name }} />
          <InputField label="Phone" inputProps={{ placeholder: "1234567890", onChangeText: (value) => handleSignUpChange("phone", value), value: signUpData.phone }} />
          <InputField label="Email" inputProps={{ keyboardType: "email-address", placeholder: "example@gmail.com", onChangeText: (value) => handleSignUpChange("email", value.toLowerCase()), value: signUpData.email }} />
          <InputField label="Password" inputProps={{ placeholder: "Password", secureTextEntry: true, onChangeText: (value) => handleSignUpChange("password", value), value: signUpData.password }} />
          <InputField label="Confirm Password" inputProps={{ placeholder: "Confirm Password", secureTextEntry: true, onChangeText: (value) => handleSignUpChange("confirmPassword", value), value: signUpData.confirmPassword }} />
          <LargeButton text="Create Account" onPress={handleSubmit} />
        </VStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const InputField = ({ label, inputProps }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.labelText}>{label}</Text>
      <Input variant="rounded" {...inputProps} />
    </View>
  );
};

export default SignUpForm;

const styles = StyleSheet.create({
  labelText: {
    fontFamily: "SF-Pro-Text-Regular",
    color: Colors.textColor,
    fontSize: 14,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 3,
    marginTop: 8,
  },
});


