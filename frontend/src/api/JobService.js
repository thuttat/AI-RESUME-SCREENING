import axiosClient from "./AxiosClient.js";

export const JobService = {
    getOwnJobs: () => {
        return axiosClient.get('/api/recruiter/jobs');
    },

    getJob: (id) => {
        return axiosClient.get(`/api/recruiter/jobs/${id}`);
    },

    createJob: (job) => {
        return axiosClient.post('/api/recruiter/jobs', job);
    },

    updateJob: (id, job) => {
        return axiosClient.put(`/api/recruiter/jobs/${id}`, job);
    },

    toggleStatus: (id) => {
        return axiosClient.patch(`/api/recruiter/jobs/${id}/status`);
    },

    deleteJob: (id) => {
        return axiosClient.delete(`/api/recruiter/jobs/${id}`);
    }
}