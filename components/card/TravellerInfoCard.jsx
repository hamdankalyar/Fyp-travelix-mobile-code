

// import React, { useState } from 'react';
// import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// import { LinearGradient } from "expo-linear-gradient";

// const TravellerInfoCard = ({persons, onSave, handleNoOfPersons }) => {
//     const [travellers, setTravellers] = useState([{ email: '', cnic: '', number: '' }]);
//     const [noOfPersons, setNoOfPersons] = useState(1);

//     const updateTraveller = (text, index, field) => {
//         const newTravellers = [...travellers];
//         newTravellers[index][field] = text;
//         setTravellers(newTravellers);
//     };

//     const addTraveller = () => {
//         setTravellers([...travellers, { email: '', cnic: '', number: '' }]);
//         setNoOfPersons(prev => prev + 1);
//     };

//     const removeTraveller = (index) => {
//         const newTravellers = [...travellers];
//         if (newTravellers.length > 1) {
//             newTravellers.splice(index, 1);
//             setTravellers(newTravellers);
//             setNoOfPersons(prev => prev - 1);
//         } else {
//             Alert.alert('Action Denied', 'You must have at least one traveller.');
//         }
//     };

//     const saveTravellerInfo = () => {
//         // Perform validations
//         for (let traveller of travellers) {
//             if (!isValidEmail(traveller.email)) {
//                 Alert.alert('Invalid Email', 'Please enter a valid email address for all travellers.');
//                 return;
//             }
//             if (!isValidNumber(traveller.number)) {
//                 Alert.alert('Invalid Phone Number', 'Please enter an 11 digit phone number for all travellers.');
//                 return;
//             }
//             if (!isValidCnic(traveller.cnic)) {
//                 Alert.alert('Invalid CNIC', 'Please enter a 13 digit CNIC number for all travellers.');
//                 return;
//             }
//         }

//         // This function sends the number of persons and travellers data to the parent component
//         handleNoOfPersons(noOfPersons);
//         onSave(travellers);
//     };

//     //--------------------------------------------validations-----------------------------------------
//     const isValidEmail = (email) => {
//         const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//         return emailRegex.test(email);
//     };

//     const isValidNumber = (number) => {
//         return number.length === 11 && !isNaN(number);
//     };

//     const isValidCnic = (cnic) => {
//         return cnic.length === 13 && !isNaN(cnic);
//     };

//     return (
//         <View style={styles.container}>
//             <LinearGradient
//                 locations={[0, 1]}
//                 colors={["#d9dddd", "rgb(240, 240, 240)"]}
//                 style={styles.CardGradientLayout}
//             >
//                 {travellers.map((traveller, index) => (
//                     <View key={index} style={styles.cardLayout}>
//                         <Text style={styles.headingText}>Traveller {index + 1} Info</Text>
//                         <View style={styles.section}>
//                             <TextInput
//                                 style={styles.input}
//                                 value={traveller.email}
//                                 onChangeText={(text) => updateTraveller(text, index, 'email')}
//                                 placeholder="Email"
//                                 keyboardType="email-address"
//                             />
//                         </View>
//                         <View style={styles.section}>
//                             <TextInput
//                                 style={styles.input}
//                                 value={traveller.cnic}
//                                 onChangeText={(text) => updateTraveller(text, index, 'cnic')}
//                                 placeholder="CNIC"
//                                 keyboardType="numeric"
//                             />
//                         </View>
//                         <View style={styles.section}>
//                             <TextInput
//                                 style={styles.input}
//                                 value={traveller.number}
//                                 onChangeText={(text) => updateTraveller(text, index, 'number')}
//                                 placeholder="Phone Number"
//                                 keyboardType="phone-pad"
//                             />
//                         </View>
//                         {travellers.length > 1 && (
//                             <TouchableOpacity onPress={() => removeTraveller(index)} style={styles.buttonDelete}>
//                                 <Text style={styles.buttonTextDelete}>Remove</Text>
//                             </TouchableOpacity>
//                         )}
//                     </View>
//                 ))}
//                 <TouchableOpacity onPress={addTraveller} style={styles.buttonAdd}>
//                     <Text style={styles.buttonTextAdd}>Add Another Traveller +</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={saveTravellerInfo} style={styles.buttonSave}>
//                     <Text style={styles.buttonTextSave}>Save Traveller Info</Text>
//                 </TouchableOpacity>
//             </LinearGradient>
//         </View>
//     );
// };




import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { LinearGradient } from "expo-linear-gradient";

const TravellerInfoCard = ({ persons, onSave, handleNoOfPersons }) => {
    const [travellers, setTravellers] = useState([{ email: '', cnic: '', number: '' }]);
    const [noOfPersons, setNoOfPersons] = useState(1);

    const updateTraveller = (text, index, field) => {
        const newTravellers = [...travellers];
        newTravellers[index][field] = text;
        setTravellers(newTravellers);
    };

    const addTraveller = () => {
        if (travellers.length < persons) {
            setTravellers([...travellers, { email: '', cnic: '', number: '' }]);
            setNoOfPersons(prev => prev + 1);
        } else {
            Alert.alert('Limit Reached', 'No more seats left.');
        }
    };

    const removeTraveller = (index) => {
        const newTravellers = [...travellers];
        if (newTravellers.length > 1) {
            newTravellers.splice(index, 1);
            setTravellers(newTravellers);
            setNoOfPersons(prev => prev - 1);
        } else {
            Alert.alert('Action Denied', 'You must have at least one traveller.');
        }
    };

    const saveTravellerInfo = () => {
        // Perform validations
        for (let traveller of travellers) {
            if (!isValidEmail(traveller.email)) {
                Alert.alert('Invalid Email', 'Please enter a valid email address for all travellers.');
                return;
            }
            if (!isValidNumber(traveller.number)) {
                Alert.alert('Invalid Phone Number', 'Please enter an 11 digit phone number for all travellers.');
                return;
            }
            if (!isValidCnic(traveller.cnic)) {
                Alert.alert('Invalid CNIC', 'Please enter a 13 digit CNIC number for all travellers.');
                return;
            }
        }

        // This function sends the number of persons and travellers data to the parent component
        handleNoOfPersons(noOfPersons);
        onSave(travellers);
    };

    // Validation functions...
    const isValidEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailRegex.test(email);
    };

    const isValidNumber = (number) => {
        return number.length === 11 && !isNaN(number);
    };

    const isValidCnic = (cnic) => {
        return cnic.length === 13 && !isNaN(cnic);
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                locations={[0, 1]}
                colors={["#d9dddd", "rgb(240, 240, 240)"]}
                style={styles.CardGradientLayout}
            >
                {travellers.map((traveller, index) => (
                    <View key={index} style={styles.cardLayout}>
                        <Text style={styles.headingText}>Traveller {index + 1} Info</Text>
                        <View style={styles.section}>
                            <TextInput
                                style={styles.input}
                                value={traveller.email}
                                onChangeText={(text) => updateTraveller(text, index, 'email')}
                                placeholder="Email"
                                keyboardType="email-address"
                            />
                        </View>
                        <View style={styles.section}>
                            <TextInput
                                style={styles.input}
                                value={traveller.cnic}
                                onChangeText={(text) => updateTraveller(text, index, 'cnic')}
                                placeholder="CNIC"
                                keyboardType="numeric"
                            />
                        </View>
                        <View style={styles.section}>
                            <TextInput
                                style={styles.input}
                                value={traveller.number}
                                onChangeText={(text) => updateTraveller(text, index, 'number')}
                                placeholder="Phone Number"
                                keyboardType="phone-pad"
                            />
                        </View>
                        {travellers.length > 1 && (
                            <TouchableOpacity onPress={() => removeTraveller(index)} style={styles.buttonDelete}>
                                <Text style={styles.buttonTextDelete}>Remove</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
                <TouchableOpacity onPress={addTraveller} style={styles.buttonAdd}>
                    <Text style={styles.buttonTextAdd}>Add Another Traveller +</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={saveTravellerInfo} style={styles.buttonSave}>
                    <Text style={styles.buttonTextSave}>Save Traveller Info</Text>
                </TouchableOpacity>
            </LinearGradient>
        </View>
    );
};

const styles = StyleSheet.create({

    buttonDelete: {
        marginTop: 10,
        backgroundColor: '#ff4d4d', // Use a color to indicate deletion
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextDelete: {
        color: '#fff',
        fontWeight: 'bold',
    },
    buttonAdd: {
        backgroundColor: '#f0f0f0', // Style as needed
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
    },
    buttonTextAdd: {
        color: '#007bff', // Style as needed
    },
    buttonSave: {
        backgroundColor: '#70DAD3', // Style as needed
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTextSave: {
        color: '#fff',
        fontWeight: 'bold',
    },
    CardGradientLayout: {
        padding: 20,
        borderRadius: 10,
    },
    container: {
        width: '90%',
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,

    },
    cardLayout: {
        padding: 20,
        borderRadius: 10,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 3,
        marginBottom: 20,
    },
    headingText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
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
        borderWidth: 1,
        borderColor: '#ddd',
    },
    button: {
        marginTop: 10,
        backgroundColor: '#70DAD3',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonAdd: {
        alignItems: 'center',
    },
    buttonTextAdd: {
        color: 'black',
        marginBottom: 20,
    },
    pickerHeading: {
        // Heading styles
        fontSize: 16,
        color: '#000',
        marginBottom: 8, // Reduce space between heading and Picker
        fontWeight: 'bold',
        marginLeft: 8, // Adjust the margin as per your design
        // You can add more styling as per your design requirements
    },
    pickerContainer: {
        color: "black",
        marginTop: 0,
        paddingTop: 0,
    },
    picker: {
        // Adjusting the Picker style, be mindful of the platform differences
        marginTop: Platform.OS === 'android' ? 0 : -30, // Example of reducing space on Android
        width: '100%',
        color: "black",
        height: 170, // Adjust the height accordingly

    },
});

export default TravellerInfoCard;
