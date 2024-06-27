
// import axios from 'axios';
// import React, { useState } from 'react';
// import { View, Text, TextInput, Button, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
// const ResetPasswordScreen = () => {
//     const [code, setCode] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');

//     const handleResetPassword = async () => {
//         if (!/^\d+$/.test(code)) {
//             Alert.alert('Validation Error', 'Verification code must be numeric.');
//             return;
//         }
//         if (newPassword.length < 8) {
//             Alert.alert('Validation Error', 'New password must be at least 8 characters long.');
//             return;
//         }
//         if (newPassword !== confirmPassword) {
//             Alert.alert('Validation Error', 'Passwords do not match.');
//             return;
//         }

//         try {
//             const response = await axios.post('https://travelix-backend-v2.vercel.app/api/auth/reset-password', {
//                 code,
//                 newPassword
//             });
//             Alert.alert("Success", "Your password has been reset successfully.");
//         } catch (error) {
//             console.error('Error:', error);
//             const message = error.response && error.response.data ? error.response.data : 'Failed to reset password.';
//             Alert.alert("Error", message);
//         }
//     };

//     return (
//         <KeyboardAvoidingView
//             behavior={Platform.OS === "ios" ? "padding" : "height"}
//             style={styles.container}
//         >
//             <View style={styles.innerContainer}>
//                 <Text style={styles.title}>Reset Password</Text>

//                 <TextInput
//                     style={styles.input}
//                     onChangeText={setCode}
//                     value={code}
//                     placeholder="Verification Code"
//                     keyboardType="numeric"
//                     returnKeyType="next"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     onChangeText={setNewPassword}
//                     value={newPassword}
//                     placeholder="New Password"
//                     secureTextEntry={true}
//                     returnKeyType="next"
//                 />
//                 <TextInput
//                     style={styles.input}
//                     onChangeText={setConfirmPassword}
//                     value={confirmPassword}
//                     placeholder="Confirm Password"
//                     secureTextEntry={true}
//                     returnKeyType="done"
//                 />
//                 <Button
//                     title="Update Password"
//                     onPress={handleResetPassword}
//                     color="#1E90FF"
//                 />
//             </View>
//         </KeyboardAvoidingView>
//     );
// };
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5',
//     },
//     innerContainer: {
//         width: '80%',
//         maxWidth: 400,
//         padding: 20,
//         backgroundColor: '#ffffff',
//         borderRadius: 10,
//         shadowColor: "#000",
//         shadowOffset: {
//             width: 0,
//             height: 2,
//         },
//         shadowOpacity: 0.25,
//         shadowRadius: 3.84,
//         elevation: 5,
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         marginBottom: 20,
//         textAlign: 'center',
//         color: '#333333',
//     },
//     input: {
//         height: 50,
//         borderColor: '#ccc',
//         borderWidth: 1,
//         marginBottom: 20,
//         paddingHorizontal: 10,
//         borderRadius: 5,
//         fontSize: 16,
//     },
// });
// export default ResetPasswordScreen;



import React, { useState } from 'react';
import { View, Text, TextInput, Button, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';

const ResetPasswordScreen = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const email = route.params?.email;  // Get email from navigation parameter
    console.log(email)
    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleResetPassword = async () => {
        // Verification code validation: must be numeric
        if (!/^\d+$/.test(code)) {
            Alert.alert('Validation Error', 'Verification code must be numeric.');
            return;
        }
        // New password length validation
        if (password.length < 8) {
            Alert.alert('Validation Error', 'New password must be at least 8 characters long.');
            return;
        }
        // Confirm password match validation
        if (password !== confirmPassword) {
            Alert.alert('Validation Error', 'Passwords do not match.');
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('https://travelix-backend-v2.vercel.app/api/auth/reset-password', {
                email,
                resetCode: code,
                newPassword: password,
            });

            if (response.status === 200) {
                Alert.alert('Success', 'Your password has been reset successfully.');
                navigation.navigate('LoginScreen'); // Adjust the route name as needed
            } else {
                throw new Error('Failed to reset password.'); // Fallback error message
            }
        } catch (error) {
            const errorMessage = error.response && error.response.data ? error.response.data : error.message;
            Alert.alert('Error', errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <View style={styles.innerContainer}>
                <Text style={styles.title}>Reset Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setCode}
                    value={code}
                    placeholder="Verification Code"
                    keyboardType="numeric"
                    returnKeyType="next"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPassword}
                    value={password}
                    placeholder="New Password"
                    secureTextEntry={true}
                    returnKeyType="next"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    placeholder="Confirm Password"
                    secureTextEntry={true}
                    returnKeyType="done"
                />
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                    <Button
                        title="Update Password"
                        onPress={handleResetPassword}
                        color="#1E90FF"
                    />
                )}
            </View>
        </KeyboardAvoidingView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    innerContainer: {
        width: '80%',
        maxWidth: 400,
        padding: 20,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333333',
    },
    input: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
        fontSize: 16,
    },
});
export default ResetPasswordScreen;
