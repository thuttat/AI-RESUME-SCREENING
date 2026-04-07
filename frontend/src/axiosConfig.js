import axios from 'axios';

const api = axios.create({
    baseURL: "/api", 
    timeout: 10000, 
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error("Phiên đăng nhập hết hạn!");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("role");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default api;