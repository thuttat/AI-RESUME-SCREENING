import axiosClient from "./AxiosClient";

export const ApplicationService = {
    getApplications: () => axiosClient.get("/applications"),
    getApplicationsByJob: (jobId) => axiosClient.get(`/applications/job/${jobId}`),
    submitEvaluation: (appId, data) => axiosClient.post(`/applications/${appId}/evaluations`, data),
    updateStatus: (appId, data) => axiosClient.patch(`/applications/${appId}/status`, data)
};