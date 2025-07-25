import axios from 'axios';

/*
const API = axios.create({
    baseURL: 'http://localhost:8080',
});
*/

const API = axios.create({
    baseURL: 'https://go-crud-api.onrender.com', // Replace with your actual Render backend URL
});

export default API;
