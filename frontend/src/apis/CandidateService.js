import api from "./AxiosClient.js"; 

export const CandidateService = {
    uploadCv: (jobId, files) => {
        const formdata = new FormData();
        formdata.append('jobId', jobId);

        files.forEach((file) => {
            formdata.append('files', file);
        });

        return api.post('/cvs/upload', formdata, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },

    parseCv: (applicationId) => {
        return api.post(`/applications/${applicationId}/parse`);
    },

    updateStatus: (applicationId, status) => {
        return api.patch(`/applications/${applicationId}/status`, status);
    }
}