
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";
import RNPickerSelect from 'react-native-picker-select';

const UserDetailsCard = ({ setUserDetail }) => {
    const [cnicNumber, setCnicNumber] = useState('');
    const [gender, setGender] = useState('Male');

    const handleSaveDetails = () => {
        const cnicRegex = /^\d{13}$/;

        if (!cnicRegex.test(cnicNumber)) {
            Alert.alert('Invalid CNIC Number', 'CNIC number must be exactly 13 digits long.');
            return;
        }

        setUserDetail({
            cnicNumber,
            gender
        });
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                locations={[0, 1]}
                colors={["#d9dddd", "rgb(240, 240, 240)"]}
                style={styles.CardGradientLayout}
            >
                <View style={styles.topSection}>
                    <Text style={styles.headingText}>Enter Your Details</Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>CNIC Number</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your CNIC number"
                        value={cnicNumber}
                        onChangeText={setCnicNumber}
                        keyboardType="numeric"
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Gender</Text>
                    <RNPickerSelect
                        onValueChange={(value) => setGender(value)}
                        items={[
                            { label: 'Male', value: 'Male' },
                            { label: 'Female', value: 'Female' },
                        ]}
                        style={pickerSelectStyles}
                        value={gender}
                        useNativeAndroidPickerStyle={false}
                        placeholder={{}}
                    />
                </View>

                <TouchableOpacity onPress={handleSaveDetails} style={styles.button}>
                    <Text style={styles.buttonText}>Save Details</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        fontSize: 16,
        padding: 15,

        borderRadius: 4,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#fff',
        marginTop: Platform.OS === 'ios' ? 4 : 0, // add this
    },
    inputAndroid: {
        fontSize: 16,
        padding: 15,

        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
        backgroundColor: '#fff',
    },
});

const styles = StyleSheet.create({
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    CardGradientLayout: {
        padding: 20,
        borderRadius: 10,
    },
    topSection: {
        marginBottom: 20,
    },
    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        fontSize: 16,
        color: '#333',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#70DAD3',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',

    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    }
});

export default UserDetailsCard;
