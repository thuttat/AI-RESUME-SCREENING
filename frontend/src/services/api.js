import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api";

const api = axios.create({
    baseURL: API_BASE_URL,
});


api.interceptors.request.use((config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const applicationService = {
    getApplications: () => api.get("/applications"),
    
    getApplicationsByJob: (jobId) => api.get(`/applications/job/${jobId}`),

    submitEvaluation: (appId, data) => api.post(`/applications/${appId}/evaluations`, data),

    updateStatus: (appId, data) => api.patch(`/applications/${appId}/status`, data)
};


export default api;