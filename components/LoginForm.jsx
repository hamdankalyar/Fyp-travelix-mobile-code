

import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Input, VStack } from "native-base";
import { Colors, RootScreenStyle } from "../constants/styles";
import LargeButton from "../ui/LargButton";  // Assuming the correct name is LargeButton
import { useNavigation } from "@react-navigation/native";

const LoginForm = ({ isLogin, onAuthenticate }) => {
  const navigation = useNavigation();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });



  const handleAuthSwitch = () => {
    if (isLogin) {
      navigation.replace("SignUpScreen");
    }
  };

  const handleLoginData = (input, value) => {
    setLoginData((prevData) => ({ ...prevData, [input]: value }));
  };

  const emailRegex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  const handleLogin = () => {
    const { email, password } = loginData;
    if (!email || !password) {
      Alert.alert("Invalid Input!", "Please check the entered credentials!");
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }
    onAuthenticate({ email, password });
  };

  return (
    <View style={[RootScreenStyle, { marginTop: 50 }]}>
      <VStack space={4} alignItems="flex-start">
        <View style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Text style={styles.labelText}>Email</Text>
          <Input
            variant="rounded"
            placeholder="@gmail.com"
            value={loginData.email}
            onChangeText={(value) => handleLoginData("email", value.toLowerCase())}
          />

        </View>
        <View style={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Text style={styles.labelText}>Password</Text>
          <Input
            variant="rounded"
            placeholder="password"
            value={loginData.password}
            onChangeText={(value) => handleLoginData("password", value)}
          />
        </View>
        <LargeButton text="Login" onPress={handleLogin} />


        <View style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          width: "100%",
          marginTop: 10,

        }}>
          <Pressable
            onPress={handleAuthSwitch}
            style={({ pressed }) => styles.toggleText}
          >
            <Text >
              Create an Account
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("ForgetPasswordEmail")}
            style={({ pressed }) => styles.toggleText}
          >
            <Text style={{ color: Colors.darkBlack }}>
              Forget Password
            </Text>
          </Pressable>
        </View>
      </VStack>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  labelText: {
    fontFamily: "SF-Pro-Text-Regular",
    color: Colors.textColor,
    fontSize: 14,
  },
  toggleText: {
    textAlign: "center",
  },
});
