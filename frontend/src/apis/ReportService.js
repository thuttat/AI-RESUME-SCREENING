import axiosClient from "./AxiosClient.js";

export const ReportService = {
    getOverviewPipeline: () => axiosClient.get("/reports/pipeline"),
    getJobDetail: (jobId) => axiosClient.get(`/reports/jobs/${jobId}`),
};