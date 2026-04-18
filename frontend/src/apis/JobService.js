import axiosClient from "./AxiosClient.js";

export const JobService = {
    getOwnJobs: () => {
        return axiosClient.get('/jobs');
    },

    getJob: (id) => {
        return axiosClient.get(`/jobs/${id}`);
    },

    createJob: (job) => {
        return axiosClient.post('/jobs', job);
    },

    updateJob: (id, job) => {
        return axiosClient.put(`/jobs/${id}`, job);
    },

    toggleStatus: (id) => {
        return axiosClient.patch(`/jobs/${id}/status`);
    },

    deleteJob: (id) => {
        return axiosClient.delete(`/jobs/${id}`);
    },

    getRankedCandidates: (id, page = 0, size = 10) => {
        return axiosClient.get(`/jobs/${id}/candidates?page=${page}&size=${size}`);
    }
}