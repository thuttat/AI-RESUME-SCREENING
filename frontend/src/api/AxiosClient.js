import axios from "axios";

const axiosClient = axios.create({
    baseURL: '/api', 
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000, 
});

axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});

axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("The login session has expired or is invalid!");
            
            localStorage.removeItem("accessToken");
            localStorage.removeItem("role");
            
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default axiosClient;