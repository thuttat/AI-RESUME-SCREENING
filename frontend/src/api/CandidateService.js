import axiosClient from "./AxiosClient.js";

export const CandidateService = {
    uploadCv: (jobId, files) => {
        const formdata = new FormData();
        formdata.append('jobId', jobId);

        files.forEach((file) => {
            formdata.append('files', file);
        });

        return axiosClient.post('/recruiter/upload', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    parseCv: (applicationId) => {
        return axiosClient.post(`/recruiter/parse/${applicationId}`);
    }
}