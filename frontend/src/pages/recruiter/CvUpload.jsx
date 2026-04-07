import React, { useState, useRef, useEffect } from 'react';
import UploadPanel from './components/UploadPanel';
import ApplicationsList from './components/ApplicationsList';
import './styles/CvUpload.css';
import { JobService } from "../../api/JobService.js";
import { CandidateService } from "../../api/CandidateService.js";

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
                const openJobs = response.data.filter(job => job.status === 'OPEN');
                setJobs(openJobs);
                if (openJobs.length > 0) setJobId(openJobs[0].id);
            } catch (error) {
                console.log("Error fetching jobs:", error);
            }
        };
        fetchOpenJobs();
    }, []);

    const handleUpload = async () => {
        if (selectedFiles.length === 0 || !jobId) {
            alert('Vui lòng chọn file và vị trí công việc!');
            return;
        }
        setIsUploading(true);

        try {
            const response = await CandidateService.uploadCv(jobId, selectedFiles);
            const uploadedData = response.data;

            const newApps = uploadedData.map((item, index) => ({
                id: item.id,
                fileName: selectedFiles[index]?.name || "Uploaded_CV.pdf",
                fileSize: selectedFiles[index] ? (selectedFiles[index].size / 1024 / 1024).toFixed(2) + ' MB' : "N/A",
                status: item.status,
                candidateName: item.candidateName || 'Đang chờ...',
                candidateEmail: item.candidateEmail || 'Đang chờ...',
                matchScore: null,
                skills: null,
                critique: null
            }));

            setApplications(prev => [...prev, ...newApps]);
            setSelectedFiles([]);
            if (fileInputRef.current) fileInputRef.current.value = '';
        } catch (error) {
            alert("Lỗi upload: " + (error.response?.data?.error || "Unknown error"));
        } finally {
            setIsUploading(false);
        }
    };

    const handleParse = async (appId) => {
        setApplications(apps => apps.map(app => app.id === appId ? { ...app, status: 'PARSING' } : app));
        try {
            const response = await CandidateService.parseCv(appId);
            const res = response.data;
            setApplications(apps => apps.map(app => app.id === appId ? { 
                ...app, 
                status: 'SUCCESS', 
                candidateName: res.candidateName,
                candidateEmail: res.candidateEmail,
                matchScore: res.matchScore,
                skills: res.extractedSkills,
                critique: res.critique 
            } : app));
        } catch (error) {
            setApplications(apps => apps.map(app => app.id === appId ? { ...app, status: 'ERROR' } : app));
        }
    };

    const handleRemove = (id) => setApplications(apps => apps.filter(app => app.id !== id));

    const handleParseAll = async () => {
        const pending = applications.filter(app => app.status === 'PENDING');
        for (const app of pending) { await handleParse(app.id); }
    };

    return (
        <div className="cv-processor-wrapper p-6">
             <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Tải Hồ Sơ Ứng Viên</h1>
                <p className="text-gray-500 text-sm">Upload và sử dụng AI để bóc tách dữ liệu CV tự động.</p>
            </div>

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