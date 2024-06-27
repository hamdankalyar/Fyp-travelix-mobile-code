import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';

const UserTravelCard = ({ setUserDetail }) => {
  const [fullName, setFullName] = useState('');
  const [cnic, setCnic] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSaveDetails = () => {
    // Here we call the setUserDetail function passed from the parent component
    // which updates the user details in the parent component's state
    setUserDetail({
      fullName,
      cnic,
      phoneNumber,
    });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        value={fullName}
        onChangeText={setFullName}
        placeholder="Enter your full name"
      />
      <Text style={styles.label}>CNIC</Text>
      <TextInput
        style={styles.input}
        value={cnic}
        onChangeText={setCnic}
        placeholder="Enter your CNIC"
        keyboardType="numeric"
      />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />
      <Button title="Save Details" onPress={handleSaveDetails} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.3,
    elevation: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 10,
    borderRadius: 6,
  },
});

export default UserTravelCard;
