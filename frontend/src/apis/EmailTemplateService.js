import api from "./AxiosClient.js";

export const EmailTemplateService = {
    getAllTemplates: (search = "", page = 0, size = 10) => {
        return api.get(`/email-templates?search=${search}&page=${page}&size=${size}`);
    },

    createTemplate: (data) => {
        return api.post(`/email-templates`, data);
    },

    updateTemplate: (id, data) => {
        return api.put(`/email-templates/${id}`, data);
    },

    deleteTemplate: (id) => {
        return api.delete(`/email-templates/${id}`);
    },

    previewTemplate: (id, mockData) => {
        return api.post(`/email-templates/${id}/preview`, mockData);
    },

    sendEmails: (payload) => {
        return api.post("/emails/send", payload);
    },

    getAllLogs: () => {
        return api.get("/email-logs");
    },

    getAllEmailLogsByRecruiter: (page = 0, size = 10) => {
        return api.get(`/email-logs/history?page=${page}&size=${size}`);
    }
}