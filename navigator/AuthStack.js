import React from 'react';

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { Colors } from '../constants/styles';
import ForgotPasswordScreen from '../screens/ForgetEmail';
import ResetPasswordScreen from '../screens/ResetPassword';
const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                contentStyle: { backgroundColor: Colors.fcfcfc },
                headerTintColor: Colors.textColor,
                headerTitleStyle: {
                    fontFamily: "SF-Pro-Text-Bold",
                },
                headerTitleAlign: "center",
            }}
        >
            <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={{
                    headerShown: false,
                    headerBackVisible: false,
                }}
            />
            <Stack.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{
                    title: "Login",
                    headerBackVisible: false,
                }}
            />
            <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{
                    title: "Signup",
                    headerStyle: { backgroundColor: Colors.fcfcfc },
                }}
            />
            <Stack.Screen
                name="ForgetPasswordEmail"
                component={ForgotPasswordScreen}
                options={{
                    title: "Forget Password",
                    headerStyle: { backgroundColor: Colors.fcfcfc },
                }}
            />
            <Stack.Screen
                name="ResetPasswordScreen"
                component={ResetPasswordScreen}
                options={{
                    //title want to be hidden 
                    headerTitle: "",
                    headerStyle: { backgroundColor: Colors.fcfcfc },
                }}
            />
        </Stack.Navigator>
    );
}
export default AuthStack;