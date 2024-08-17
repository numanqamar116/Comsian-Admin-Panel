import axios from 'axios'

// Create an Axios instance with default configuration
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Adjust this to match your backend URL
  timeout: 10000, // 10 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
})

export default axiosInstance
