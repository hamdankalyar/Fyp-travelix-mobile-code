// src/api/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://travelix-backend-v2.vercel.app/', // replace with your actual server IP and port
});

export default instance;
