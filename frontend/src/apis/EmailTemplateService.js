import axiosClient from "./AxiosClient.js";

export const EmailTemplateService = {
    getAllTemplates: (search = "", page = 0, size = 10) => {
        return axiosClient.get(`/email-templates?search=${search}&page=${page}&size=${size}`);
    },

    createTemplate: (data) => {
        return axiosClient.post(`/email-templates`, data);
    },

    updateTemplate: (id, data) => {
        return axiosClient.put(`/email-templates/${id}`, data);
    },

    deleteTemplate: (id) => {
        return axiosClient.delete(`/email-templates/${id}`);
    },

    previewTemplate: (id, mockData) => {
        return axiosClient.post(`/email-templates/${id}/preview`, mockData);
    },

    sendEmails: (payload) => {
        return axiosClient.post("/emails/send", payload);
    },

    getAllLogs: () => {
        return axiosClient.get("/email-logs");
    },

    getAllEmailLogsByRecruiter: (page = 0, size = 10) => {
        return axiosClient.get(`/email-logs/history?page=${page}&size=${size}`);
    }
}