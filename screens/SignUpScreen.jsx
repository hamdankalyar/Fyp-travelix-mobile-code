import { StyleSheet, View, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { AuthContext } from "../store/auth-context";
import MainHeading from "../components/MainHeading";
import SubHeading from "../components/SubHeading";
import SignUpForm from "../components/SignUpForm";
import LoadingOverlay from "../components/LoadingOverly"; // Ensure the name is correct

const SignUpScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function signUpHandler(signUpData) {
    console.log('SignUpScreen Received Data:', signUpData);
    try {
      setIsAuthenticating(true);
      await authCtx.signup(signUpData.name, signUpData.email, signUpData.password, signUpData.phone, 'user');
      setIsAuthenticating(false);
    } catch (error) {
      console.error('Error during signup:', error);
      Alert.alert("Signup Error", "Could not sign up. Please try again later.");
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Creating user..."} />;
  }

  return (
    <View style={styles.rootScreen}>
      <MainHeading text="Let's explore together!" />
      <SubHeading text="Create your account to explore your dream place to live across the whole world!" />
      <SignUpForm onAuthenticate={signUpHandler} />
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
});
