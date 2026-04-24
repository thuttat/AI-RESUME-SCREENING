import api from "./AxiosClient";

export const ApplicationService = {
    getApplications: () => api.get("/applications"),
    getApplicationsByJob: (jobId) => api.get(`/applications/job/${jobId}`),
    submitEvaluation: (appId, data) => api.post(`/applications/${appId}/evaluations`, data),
    updateStatus: (appId, data) => api.patch(`/applications/${appId}/status`, data)
};