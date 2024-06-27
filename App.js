
import { LogBox } from 'react-native';

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useFonts } from "expo-font";
import { NativeBaseProvider } from "native-base";
import React from "react";
import { useState, useEffect } from "react";
import AuthContextProvider from "./store/auth-context";
import SplashScreen from "./screens/SplashScreen";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Root from "./navigator/Root";
import { StripeProvider } from '@stripe/stripe-react-native';

export default function App() {
  LogBox.ignoreAllLogs(true);

  const [fontsLoaded] = useFonts({
    "SF-Pro-Text-Bold": require("./assets/font/SF-Pro-Text-Bold.otf"),
    "SF-Pro-Text-Heavy": require("./assets/font/SF-Pro-Text-Heavy.otf"),
    "SF-Pro-Text-Light": require("./assets/font/SF-Pro-Text-Light.otf"),
    "SF-Pro-Text-Medium": require("./assets/font/SF-Pro-Text-Medium.otf"),
    "SF-Pro-Text-Regular": require("./assets/font/SF-Pro-Text-Regular.otf"),
    "SF-Pro-Text-Semibold": require("./assets/font/SF-Pro-Text-Semibold.otf"),
  });

  const [isSplashLoading, setIsSplashLoading] = useState(true);

  useEffect(() => {
    if (fontsLoaded) {
      setTimeout(() => {
        setIsSplashLoading(false);
      }, 4000);
    }
  }, [fontsLoaded]);

  if (!fontsLoaded || isSplashLoading) {
    return <SplashScreen onAnimationComplete={() => setIsSplashLoading(false)} />;
  }

  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <StripeProvider publishableKey="pk_test_51P6FSHJ8YlrI7gTXHjCMmEPGbCtQlg4OlFcDPZxEWDYVGwnzGWnwMIisW5Hkpp54EQeSjDGFwFBUvH04VKqFVGBx00rbxTja8Z">
          <AuthContextProvider>
            <SafeAreaView style={styles.container}>
              <StatusBar style="dark" />
              <Root />
            </SafeAreaView>
          </AuthContextProvider>
        </StripeProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});