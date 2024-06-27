import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import AuthenticatedStack from "./AuthenticatedStack";
import AuthStack from "./AuthStack";

const Navigation = () => {
    const authCtx = useContext(AuthContext);

    return (
        <NavigationContainer>
            {authCtx.isAuthenticated ? <AuthenticatedStack /> : <AuthStack />}
        </NavigationContainer>
    );
}

export default Navigation;
