import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faCar, faHotel, faUser, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import MainScreen from '../screens/MainScreen';
import CarHomeScreen from '../screens/ModuleScreens/CarHomeScreen';
import ProfileSettingsScreen from '../screens/ProfileSettingScreen';
import { Colors } from '../constants/styles';
import HotelHomeScreen from '../screens/ModuleScreens/HotelHomeScreen';
import TravelHomeScreen from '../screens/ModuleScreens/TravelHomeScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

    return (

        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: Colors.buttonAndIcons,
                tabBarStyle: {
                    height: 60, // Adjust the height if necessary
                    paddingBottom: 5,
                },
            }}
        >
            <Tab.Screen
                name="Home"
                component={MainScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faHouse} color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="Car Rental"
                component={CarHomeScreen}
                options={{
                    tabBarLabel: 'Car Rental',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faCar} color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="Hotel Rental"
                component={HotelHomeScreen}
                options={{
                    tabBarLabel: 'Hotel Rental',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faHotel} color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="TravelScreen"
                component={TravelHomeScreen}
                options={{
                    tabBarLabel: 'Travel Packages',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faMapLocationDot} color={color} size={20} />
                    ),
                }}
            />
            <Tab.Screen
                name="ProfileSetting"
                component={ProfileSettingsScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesomeIcon icon={faUser} color={color} size={20} />
                    ),
                }}
            />

        </Tab.Navigator>


    );
}


export default BottomTabNavigator;
