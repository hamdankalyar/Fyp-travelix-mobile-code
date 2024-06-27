import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { useState } from "react";
import MainHeading from "../components/MainHeading";
import SubHeading from "../components/SubHeading";
import LoginForm from "../components/LoginForm";
import { loginUser } from "../util/auth";
import LoadingOverlay from "../components/LoadingOverly";
import { AuthContext } from "../store/auth-context";

const LoginScreen = ({ navigation }) => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);

  async function handleLogin({ email, password }) {
    try {
      setIsAuthenticating(true);
      const response = await loginUser(email, password);
      const token = response.data.token;
      if (token) {
        await authCtx.authenticate(token);
      } else {
        throw new Error('Token not found in response.');
      }
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not log in. Please check your credentials or try again later."
      );
    } finally {
      setIsAuthenticating(false);
    }
  }

  if (isAuthenticating) {
    return <LoadingOverlay message={"Logging you in..."} />;
  }

  return (
    <View style={styles.rootScreen}>
      <MainHeading text={"Welcome Back!"} />
      <SubHeading text={"Log In to your account to explore your dream place to live across the whole world!"} />
      <LoginForm isLogin onAuthenticate={handleLogin} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    
    justifyContent: "center", // Center content vertically
  },
});
