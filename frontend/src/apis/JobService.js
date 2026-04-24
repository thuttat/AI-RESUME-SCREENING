import api from "./AxiosClient.js";

export const JobService = {
    getOwnJobs: () => {
        return api.get('/jobs');
    },

    getJob: (id) => {
        return api.get(`/jobs/${id}`);
    },

    createJob: (job) => {
        return api.post('/jobs', job);
    },

    updateJob: (id, job) => {
        return api.put(`/jobs/${id}`, job);
    },

    toggleStatus: (id) => {
        return api.patch(`/jobs/${id}/status`);
    },

    deleteJob: (id) => {
        return api.delete(`/jobs/${id}`);
    },

    getRankedCandidates: (id, page = 0, size = 10) => {
        return api.get(`/jobs/${id}/candidates?page=${page}&size=${size}`);
    }
}