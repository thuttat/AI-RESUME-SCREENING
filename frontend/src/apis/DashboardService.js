import axiosClient from "./AxiosClient.js";

export const DashboardService = {
    getRecruiterStats: () => {
        return axiosClient.get("/recruiter/dashboard");
    }
};