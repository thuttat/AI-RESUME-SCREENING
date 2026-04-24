import api from "./AxiosClient.js";

export const ReportService = {
    getOverviewPipeline: () => api.get("/reports/pipeline"),
    getJobDetail: (jobId) => api.get(`/reports/jobs/${jobId}`),
};