

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const BASE_URL = "https://travelix-backend-v2.vercel.app/api"; // Update this if your API is deployed

// In your auth.js or wherever makeRequest is located
export async function makeRequest(endpoint, data) {
  try {
    const response = await axios.post(`${BASE_URL}${endpoint}`, data);

    return { data: response.data, headers: response.headers };
  } catch (error) {
    console.error("Authentication error:", error.response ? error.response.data : error.message);
    // Include the response in the thrown error for further handling
    throw error.response || error;
  }
}


// In your auth.js utility file
export async function createUser(name, email, password, phone) {
  const data = {
    name: name,
    email: email,
    password: password,
    role: "user",
    phone: phone, // Dynamically include the phone number passed to the function
  };
  console.log('createUser Request Data:', data);
  // Return the entire response object
  const response = await makeRequest('/auth/register', data);
  return response;
}



// export function loginUser(email, password) {
//   const data = {
//     email: email,
//     password: password,

//   };
//   return makeRequest('/auth/login', data);
// }
export async function loginUser(email, password) {
  const data = {
    email: email,
    password: password,
  };
  try {
    const response = await makeRequest('/auth/login', data);
    console.log('Login Response:', response);  // Log the response data
    // Extract the token and user data from the response.data
    const { token, _id, email, image, name, phone, } = response.data;
    const userData = {

      _id,
      email,
      image,
      name,
      phone,
    };
    console.log("hello", userData)

    // Convert the object to a JSON string
    const userDataJson = JSON.stringify(userData);

    // Storing token and user data in AsyncStorage
    if (token) {
      await AsyncStorage.setItem('token', token);

    } else {
      console.error('No token received');
    }

    await AsyncStorage.setItem('UserData', userDataJson);

    return response;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;  // Ensure the error is thrown after logging
  }
}
