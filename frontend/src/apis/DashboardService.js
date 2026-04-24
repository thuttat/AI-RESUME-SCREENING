import api from "./AxiosClient.js";

export const DashboardService = {
    getRecruiterStats: () => {
        return api.get("/recruiter/dashboard");
    }
};