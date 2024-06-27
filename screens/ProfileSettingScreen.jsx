

import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { AuthContext } from '../store/auth-context'; // Update with the correct path
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
const ProfileSettingsScreen = ({ navigation }) => {
  const authCtx = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [profileImage, setProfileImage] = useState('');
  // This hook runs the fetchUserData function every time the screen comes into focus
  const fetchUserData = async () => {
    const userDataString = await AsyncStorage.getItem('UserData');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setUsername(userData.name); // Make sure 'name' is the correct property
      setProfileImage(userData.image); // Make sure 'image' is the correct property
      console.log("UserData:", userData);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchUserData();
    }, [])
  );
 

  const handleLogout = () => {
    authCtx.logout(); // Implement or ensure this method exists in your context
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: profileImage || 'https://via.placeholder.com/150' }} style={styles.profilePic} />
      <Text style={styles.username}>{username}</Text>
      <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('ProfileSettings')}>
        <Text style={styles.settingText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('BookingHistoryScreen')}>
        <Text style={styles.settingText}>Booking History</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  profilePic: {
    width: 150,
    height: 150,
    borderRadius: 75,
    alignSelf: 'center',
    marginTop: 20,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  settingText: {
    fontSize: 16,
    color: '#333333',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileSettingsScreen;
