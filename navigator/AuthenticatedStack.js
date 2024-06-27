
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext } from "react";
import { Colors } from "../constants/styles";

import BookingDetail from "../screens/BookingDetail";
import PaymentScreen from "../screens/PaymentScreen";
import MainScreen from "../screens/MainScreen";
import CarHomeScreen from "../screens/ModuleScreens/CarHomeScreen";
import FilterScreen from "../screens/common/FilterScreen";
import SearchResult from "../screens/car/SearchResult";
import BottomTabNavigator from "./BottomTabNavigator";
import CardTesting from "../screens/CardTesting";
import HomeScreen from "../screens/HomeScreen";
import TravelHomeScreen from "../screens/ModuleScreens/TravelHomeScreen";
import HotelHomeScreen from "../screens/ModuleScreens/HotelHomeScreen";
import CarDetailScreen from "../screens/ModuleDetailScreens/CarDetailScreen";
import HotelDetailScreen from "../screens/ModuleDetailScreens/HotelDetailScreen";
import MyBookingScreen from "../screens/BookingScreens/MyBookingScreen";
import DoneAnimationScreen from "../screens/DoneAnimationScreen";
import TourDetailScreen from "../screens/ModuleDetailScreens/DetailScreen";
import GeocodingExample from "../screens/CardTesting";
import TourBookingScreen from "../screens/BookingScreens/TourBookingScreen";

import StripeApps from "../screens/StripeCheck";
import HotelBookingScreen from "../screens/BookingScreens/HotelBookingScreen";
import BookingHistoryScreen from "../screens/BookingHistoryScreen";
import ProfileSettings from "../screens/ProfileSetting";

const Stack = createNativeStackNavigator();

const AuthenticatedStack = () => {
    return (

        <Stack.Navigator
            initialRouteName="BottomTabs"
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
                name="BottomTabs"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="StripeTest"
                component={StripeApps}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="DoneAnimationScreen"
                component={DoneAnimationScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="MainScreen"
                component={MainScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CarHomeScreen"
                component={CarHomeScreen}
                options={{
                    // contentStyle: { marginTop: 5 },
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="CarDetailScreen"
                component={CarDetailScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="HotelDetailScreen"
                component={HotelDetailScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="MyBooking"
                component={MyBookingScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="TourBookingScreen"
                component={TourBookingScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="HotelBookingScreen"
                component={HotelBookingScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="BookingHistoryScreen"
                component={BookingHistoryScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="TravelHomeScreen"
                component={TravelHomeScreen}
                options={{
                    // contentStyle: { marginTop: 5 },
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="HotelHomeScreen"
                component={HotelHomeScreen}
                options={{
                    // contentStyle: { marginTop: 5 },
                    headerShown: false,
                }}

            />
            <Stack.Screen
                name="ProfileSettings"
                component={ProfileSettings}
                options={{
                    title: "Profile Settings",  
                }}
            />
            <Stack.Screen
                name="FilterScreen"
                component={FilterScreen}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="SearchResultScreen"
                component={SearchResult}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="DetailScreen"
                component={TourDetailScreen}
                options={{
                    title: "Package Details",
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="DetailsDetails"
                component={BookingDetail}
                options={{
                    title: "BookingDetails",
                }}
            />
            <Stack.Screen
                name="PaymentScreen"
                component={PaymentScreen}
                options={{
                    title: "Payment",
                }}
            />
            <Stack.Screen
                name="Testing"
                component={GeocodingExample}
                options={{
                    title: "Testing",
                }}
            />

        </Stack.Navigator>

    );
}
export default AuthenticatedStack;

