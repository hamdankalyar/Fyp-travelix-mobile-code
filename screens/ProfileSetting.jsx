

// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     Button,
//     StyleSheet,
//     Image,
//     TouchableOpacity,
//     Alert,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ProfileSettings = () => {
//     const [username, setUsername] = useState('');
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [profileImage, setProfileImage] = useState(null);

//     useEffect(() => {
//         const fetchUserData = async () => {
//             const userDataString = await AsyncStorage.getItem('UserData');
//             console.log(userDataString)
//             if (userDataString) {
//                 const userData = JSON.parse(userDataString);
//                 setUsername(userData.name);  // Set username from stored data
//                 setProfileImage(userData.image); // Set profile image from stored data
//             }
//         };

//         fetchUserData();
//     }, []);

//     const pickImage = async () => {
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         if (!result.cancelled) {
//             setProfileImage(result.uri); // Update profile image state
//             // Optionally update AsyncStorage if necessary here
//             // const userData = JSON.parse(await AsyncStorage.getItem('UserData'));
//             // userData.image = result.uri;
//             // await AsyncStorage.setItem('UserData', JSON.stringify(userData));
//         }
//     };

//     const validateUsername = () => /^[a-zA-Z]+$/.test(username);
//     const validateNewPassword = () => newPassword.length >= 8;

//     const handleUpdateProfile = async () => {
//         if (!validateUsername()) {
//             Alert.alert("Validation Error", "Username must contain only alphabets.");
//             return;
//         }
//         if (!validateNewPassword()) {
//             Alert.alert("Validation Error", "New password must be at least 8 characters long.");
//             return;
//         }
//         const userData = JSON.parse(await AsyncStorage.getItem('UserData'));

//         Alert.alert("Success", "Profile updated successfully!");
//     };

//     return (
//         <View style={styles.container}>
//             <TouchableOpacity onPress={pickImage} style={styles.profilePicContainer}>
//                 <Image source={{ uri: profileImage || 'data:image/jpeg;base64,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' }} style={styles.profilePic} />
//                 <Text style={styles.editText}>Edit</Text>
//             </TouchableOpacity>

//             <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Username</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={username}
//                     onChangeText={setUsername}
//                     placeholder="Enter username"
//                 />
//             </View>

//             <View style={styles.inputContainer}>
//                 <Text style={styles.label}>Current Password</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={currentPassword}
//                     onChangeText={setCurrentPassword}
//                     secureTextEntry={true}
//                     placeholder="Current password"
//                 />
//             </View>

//             <View style={styles.inputContainer}>
//                 <Text style={styles.label}>New Password</Text>
//                 <TextInput
//                     style={styles.input}
//                     value={newPassword}
//                     onChangeText={setNewPassword}
//                     secureTextEntry={true}
//                     placeholder="New password"
//                 />
//             </View>

//             <Button
//                 title="Update Profile"
//                 onPress={handleUpdateProfile}
//             />
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//         padding: 20,
//     },
//     profilePicContainer: {
//         marginBottom: 20,
//         alignItems: 'center',
//     },
//     profilePic: {
//         width: 150,
//         height: 150,
//         borderRadius: 75,
//         marginBottom: 8,
//     },
//     editText: {
//         color: '#1E90FF',
//         fontWeight: 'bold',
//     },
//     inputContainer: {
//         width: '100%',
//         marginBottom: 15,
//     },
//     label: {
//         fontSize: 16,
//         color: '#000',
//         marginBottom: 5,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         fontSize: 16,
//         color: '#333',
//     },
// });
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
    Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';

const ProfileSettings = () => {
    const [username, setUsername] = useState('');
    const [profileImage, setProfileImage] = useState(null);
    const [imageChanged, setImageChanged] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const userDataString = await AsyncStorage.getItem('UserData');
            if (userDataString) {
                const userData = JSON.parse(userDataString);
                setUsername(userData.name);
                setProfileImage(userData.image);
                setId(userData._id);
            }
        };

        fetchUserData();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfileImage(result.uri);
            setImageChanged(true); // Flag that the image has been changed
        }
    };

    // const handleUpdateProfile = async () => {
    //     const formData = new FormData();
    //     formData.append('_id', id);
    //     formData.append('name', username);

    //     if (imageChanged && profileImage) {
    //         const response = await fetch(profileImage);
    //         const blob = await response.blob();

    //         formData.append('image', blob);
    //     }


    //     fetch('https://travelix-backend-v2.vercel.app/auth/resetUserInfo', {
    //         method: 'POST',
    //         body: formData,
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             Alert.alert('Success', 'Profile updated successfully!');
    //             setImageChanged(false);
    //             // Optionally update AsyncStorage here
    //         })
    //         .catch(error => {
    //             console.error('Error:', error);
    //             Alert.alert('Error', 'Failed to update profile.');
    //         });
    // };
    // Function to fetch and update user data
    const updateUserData = async () => {
        try {
            const userDataString = await AsyncStorage.getItem('UserData');
            if (userDataString !== null) {
                // Parse the user data string to an object
                let userData = JSON.parse(userDataString);

                // Update the name or any other property
                userData.name = username; // Assuming 'username' is defined elsewhere in your code

                // Optional: If you want to save the updated data back to AsyncStorage
                await AsyncStorage.setItem('UserData', JSON.stringify(userData));

                console.log("Updated UserData:", userData);
            } else {
                console.log("No user data found.");
            }
        } catch (error) {
            console.log("Error updating user data:", error);
        }
    };


    const handleUpdateProfile = async () => {
        const formData = new FormData();
        formData.append('_id', id);
        formData.append('name', username);

        if (imageChanged && profileImage) {
            const response = await fetch(profileImage);
            const blob = await response.blob();
            // formData.append('image', blob);
        }

        console.log("Form Data\n", formData)

        try {
            const response = await fetch('https://travelix-backend-v2.vercel.app/api/auth/resetUserInfo', {
                method: 'POST',
                body: formData,
                headers: {

                    'Content-Type': 'multipart/form-data',
                },
            });
            const data = await response.json();
            if (response.ok) {
                Alert.alert('Success', 'Profile updated successfully!');

                updateUserData();
                setImageChanged(false);
                if (imageChanged && profileImage) {
                    const updatedUserData = await AsyncStorage.getItem('UserData');
                    if (updatedUserData) {
                        const userData = JSON.parse(updatedUserData);
                        userData.image = profileImage; // Update the image URI
                        await AsyncStorage.setItem('UserData', JSON.stringify(userData));
                    }
                }
            } else {
                throw new Error(data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error:', error);
            Alert.alert('Error', error.message || 'Failed to update profile.');
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={styles.profilePicContainer}>
                <Image source={{ uri: profileImage || 'https://via.placeholder.com/150' }} style={styles.profilePic} />
                <Text style={styles.editText}>Edit</Text>
            </TouchableOpacity>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    style={styles.input}
                    value={username}
                    onChangeText={setUsername}
                    placeholder="Enter username"
                />
            </View>

            <Button
                title="Update Profile"
                onPress={handleUpdateProfile}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    profilePicContainer: {
        marginBottom: 20,
        alignItems: 'center',
    },
    profilePic: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 8,
    },
    editText: {
        color: '#1E90FF',
        fontWeight: 'bold',
    },
    inputContainer: {
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        color: '#000',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        color: '#333',
    },
});

export default ProfileSettings;
