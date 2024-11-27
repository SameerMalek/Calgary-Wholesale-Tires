import axios from "axios";

const apiRequest = axios.create({
    baseURL: "https://calgary-wholesale-tires.onrender.com/api",
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

//Add a response interceptor
apiRequest.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error('API request error:', error);
        return Promise.reject(error);
    }
);

export default apiRequest; 