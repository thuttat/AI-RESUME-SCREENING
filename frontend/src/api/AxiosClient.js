import axios from "axios";

const axiosClient = axios.create({
    baseURL: '/api',
    headers: {
        "Content-Type": "application/json",
    }
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
            console.error("Phiên đăng nhập hết hạn hoặc không hợp lệ!");
            
            localStorage.removeItem("accessToken");
            localStorage.removeItem("role");
            
            window.location.href = "/";
        }

        return Promise.reject(error);
    }
);

export default axiosClient;