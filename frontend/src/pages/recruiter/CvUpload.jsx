import React, {useState, useRef, useEffect} from 'react';
import UploadPanel from './components/UploadPanel';
import ApplicationsList from './components/ApplicationsList';
import './styles/CvUpload.css';
import {JobService} from "../../api/JobService.js";
import {CandidateService} from "../../api/CandidateService.js";

export default function CvUpload() {
    const [jobs, setJobs] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [applications, setApplications] = useState(() => {
        const savedData = sessionStorage.getItem('cv_workspace_session');
        return savedData ? JSON.parse(savedData) : [];
    });
    const [jobId, setJobId] = useState('');
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        sessionStorage.setItem('cv_workspace_session', JSON.stringify(applications));
    }, [applications]);

    useEffect(() => {
        const fetchOpenJobs = async () => {
            try {
                const response = await JobService.getOwnJobs();
                const allJobs = response.data;
                const openJobs = allJobs.filter(job => job.status === 'OPEN');
                setJobs(openJobs);

                if (openJobs.length > 0) {
                    setJobId(openJobs[0].id);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchOpenJobs();
    }, []);

    const handleUpload = async () => {
        if (selectedFiles.length === 0 || !jobId) {
            alert('Please select a file and job position!');
            return;
        }
        setIsUploading(true);

        try {
            const response = await CandidateService.uploadCv(jobId, selectedFiles);
            const uploadedData = response.data;

            const newApps = uploadedData.map((item, index) => {
                const originalFile = selectedFiles[index];
                const fallbackName = item.cvFileUrl ? item.cvFileUrl.substring(item.cvFileUrl.lastIndexOf('/') + 1) : "Uploaded_CV.pdf";

                return {
                    id: item.id,
                    fileName: originalFile ? originalFile.name : fallbackName,
                    fileSize: originalFile ? (originalFile.size / 1024 / 1024).toFixed(2) + ' MB' : "N/A",
                    status: item.status,
                    candidateName: item.candidateName || 'Waiting...',
                    candidateEmail: item.candidateEmail || 'Waiting...',
                    matchScore: null,
                    skills: null,
                    critique: null,
                    errorDetail: null
                }
            });

            setApplications(prev => [...prev, ...newApps]);
            setSelectedFiles([]);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            console.log(error);
            alert("Error uploading file: " + (error.response?.data?.error));
        } finally {
            setIsUploading(false);
        }
    };

    const handleParse = async (appId) => {
        setApplications(apps =>
            apps.map(app => app.id === appId ? { ...app, status: 'PARSING' } : app)
        );

        try {
            const response = await CandidateService.parseCv(appId);
            const analysis = response.data;

            setApplications(apps =>
                apps.map(app =>
                    app.id === appId
                        ? {
                            ...app,
                            status: 'SUCCESS',
                            candidateName: analysis.candidateName,
                            candidateEmail: analysis.candidateEmail,
                            matchScore: analysis.matchScore,
                            skills: analysis.extractedSkills,
                            critique: analysis.critique,
                            errorDetail: null
                        }
                        : app
                )
            );
        } catch (error) {
            console.log(error);
            setApplications(apps =>
                apps.map(app =>
                    app.id === appId
                        ? {
                            ...app,
                            status: 'ERROR',
                            errorDetail: error.response?.data?.error || "AI cannot parse this CV!"
                        }
                        : app
                )
            );
        }
    };

    const handleRemove = (id) => {
        setApplications(apps => apps.filter(app => app.id !== id));
    };

    const handleParseAll = async () => {
        const pendingApps = applications.filter(app => app.status === 'PENDING');

        if (pendingApps.length === 0) return;

        for (const app of pendingApps) {
            await handleParse(app.id);
        }
    };

    return (
        <div className="cv-processor-wrapper">
            <UploadPanel
                selectedFiles={selectedFiles}
                setSelectedFiles={setSelectedFiles}
                jobId={jobId}
                setJobId={setJobId}
                jobs={jobs}
                onUpload={handleUpload}
                fileInputRef={fileInputRef}
                isUploading={isUploading}
            />

            <ApplicationsList
                applications={applications}
                onParse={handleParse}
                onRemove={handleRemove}
                onParseAll={handleParseAll}
            />
        </div>
    );
}