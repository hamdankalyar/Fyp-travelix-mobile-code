import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import { Alert } from "react-native";

import React from "react";

function LocationPicker() {
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  async function verifyPermissions() {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission;
      return permissionResponse.granted;
    }
    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insuficient Permission!",
        "you need to grant location permissions to use this app"
      );
      return false;
    }
    return true;
  }

  async function getLocationHandler() {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) {
      return;
    }
    const location = await getCurrentPositionAsync();
    console.log(location);
  }
  return <div>LocationPicker</div>;
}

export default LocationPicker;
