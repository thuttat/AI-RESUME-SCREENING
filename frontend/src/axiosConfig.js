import axios from 'axios';

const api = axios.create({
    baseURL: "/api", 
    timeout: 10000, 
});

// Interceptor cho Request: Đính kèm token vào Header
api.interceptors.request.use(
    (config) => {
        // SỬA: Lấy đúng "accessToken"
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor cho Response: Xử lý khi Token hết hạn (401)
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