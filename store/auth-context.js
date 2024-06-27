import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useState } from 'react';
import { loginUser, createUser } from '../util/auth'; // Ensure this path is correct

export const AuthContext = createContext({
  token: '',
  userData: null, // Add this line to store the user ID
  isAuthenticated: false,
  login: async (email, password) => { },
  signup: async (name, email, password) => { },
  logout: () => { },
  authenticate: async (token) => { },
});

const AuthContextProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(null);
  const [userData, setuserData] = useState(null); // State to store the user ID

  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password); // Assuming 'user' is a default role
      setAuthToken(data.token);
      console.log("Stringified Data", JSON.stringify(data.data, null, 2));
      AsyncStorage.setItem('UserData', JSON.stringify(data.data));

      AsyncStorage.setItem('token', data.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  // // In your AuthContextProvider component
  // const signup = async (name, email, password, role) => {
  //   try {
  //     const response = await createUser(name, email, password, role);
  //     console.log('Signup Success Response:', response);

  //     // Stringify the response object before storing it
  //     await AsyncStorage.setItem('UserData', JSON.stringify(response));

  //     // Retrieving the data
  //     const userDataString = await AsyncStorage.getItem('UserData');
  //     const userDataa = JSON.parse(userDataString);
  //     console.log("Retrieved UserData", userDataa);


  //     setuserData(userDataa); // Store the user ID in the state
  //     // Access the token from the headers of the response

  //     const token = response.headers['x-auth-token'];
  //     if (token) {
  //       console.log('Token:', token);
  //       setAuthToken(token);
  //       await AsyncStorage.setItem('token', token);
  //     } else {
  //       console.error('Token is missing in the response headers');
  //       throw new Error('Token is missing in the response headers');
  //     }
  //   } catch (error) {
  //     console.error('Signup failed:', error);
  //     throw error; // Rethrow the error so it can be caught and handled where signup is called
  //   }
  // };

  const signup = async (name, email, password, phone) => {
    try {
      const response = await createUser(name, email, password, phone);
      console.log('Signup Success Response:', response);

      await AsyncStorage.setItem('UserData', JSON.stringify(response.data));
      const userDataa = JSON.parse(await AsyncStorage.getItem('UserData'));
      console.log("Retrieved UserData", userDataa);

      setuserData(userDataa); // Store the user data in the state

      const token = response.headers['x-auth-token'];
      if (token) {
        console.log('Token:', token);
        setAuthToken(token);
        await AsyncStorage.setItem('token', token);
      } else {
        console.error('Token is missing in the response headers');
        throw new Error('Token is missing in the response headers');
      }
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  };


  const logout = async () => {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('UserData');
  };

  // New function to authenticate by token directly
  const authenticate = async (token) => {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  };

  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    userData: userData,
    login,
    signup,
    logout,
    authenticate, // Make sure to add this to the context value
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContextProvider;
