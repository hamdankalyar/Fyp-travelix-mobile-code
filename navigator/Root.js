


import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navigation from "./Navigation";
import SplashScreen from "../screens/SplashScreen"; // If you have a SplashScreen for this case

const Root = () => {
    const [isTryingLogin, setIsTryingLogin] = useState(true);
    const authCtx = useContext(AuthContext);

    useEffect(() => {
        const fetchToken = async () => {
            const storedToken = await AsyncStorage.getItem("token");
            if (storedToken) {
                authCtx.authenticate(storedToken);
            }
            setIsTryingLogin(false);
        };
        fetchToken();
    }, []);

    if (isTryingLogin) {
        return <SplashScreen />; // Show splash screen or loading indicator while checking token
    }

    return <Navigation />;
}

export default Root;
