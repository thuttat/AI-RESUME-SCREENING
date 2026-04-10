import React, {useEffect, useState} from 'react';
import { Button } from '../../components/common/Button';
import { Plus } from 'lucide-react';
import JobTable from './components/JobTable';
import JobFormModal from './components/JobFormModal';
import './styles/JobManagement.css';
import {JobService} from "../../apis/JobService.js";
import Pagination from "./components/Pagination.jsx";


export default function JobManagement() {
    const [jobs, setJobs] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedJob, setSelectedJob] = useState(null);
    const [modalMode, setModalMode] = useState('create');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const fetchJobs = async () => {
        try {
            setLoading(true);
            const response = await JobService.getOwnJobs();
            setJobs(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleFormSubmit = async (formData) => {
        if (!formData.title || formData.title.trim().length < 5) {
            alert("Job title must have at least 5 characters!");
            return;
        }

        try {
            const requestPayload = {
                title: formData.title,
                description: formData.description,
                requiredSkills: formData.skills,
            }

            if (modalMode === 'edit') {
                await JobService.updateJob(selectedJob.id, requestPayload);
            } else {
                await JobService.createJob(requestPayload);
            }
            setIsModalOpen(false);
            fetchJobs();
        } catch (error) {
            console.log(error);
            alert("Create job failed!");
        }
    };

    const handleToggleStatus = async (id) => {
        try {
            await JobService.toggleStatus(id);
            fetchJobs();
        } catch (error) {
            console.log(error);
        }
    };

    const openCreateModal = () => {
        setSelectedJob(null);
        setModalMode('create');
        setIsModalOpen(true);
    };

    const handleEditClick = async (id) => {
        try {
            const response = await JobService.getJob(id);
            setSelectedJob(response.data);
            setModalMode('edit');
            setIsModalOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleViewClick = async (id) => {
        try {
            const response = await JobService.getJob(id);
            setSelectedJob(response.data);
            setModalMode('view');
            setIsModalOpen(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteJob = async (id) => {
        if (!window.confirm(`Are you sure you want to delete this job?`)) return;
        try {
            await JobService.deleteJob(id);
            fetchJobs();
        } catch (error) {
            console.log(error);
            alert("Delete job failed!");
        }
    };

    const sortJobs = (jobs) => {
        return [...jobs].sort((a, b) => {
            if (a.status !== b.status) {
                return a.status === 'OPEN' ? -1 : 1;
            }
            return new Date(b.createdAt) - new Date(a.createdAt);
        });
    };

    const sortedJobs = sortJobs(jobs);

    const indexOfLast = currentPage * itemsPerPage;
    const indexOfFirst = indexOfLast - itemsPerPage;
    const currentJobs = sortedJobs.slice(indexOfFirst, indexOfLast);
    const totalPages = Math.ceil(jobs.length / itemsPerPage);

    return (
        <div className="job-container">
            <div className="job-header">
                <div>
                    <h1>All Jobs</h1>
                    <p className="page-subtitle">Manage job postings</p>
                </div>

                <Button onClick={openCreateModal}>
                    <Plus size={18} />
                    Create Job
                </Button>
            </div>

            {loading ? (
                <p style={{ textAlign: 'center', padding: '1px' }}>Loading jobs...</p>
            ) : (
                <JobTable
                    jobs={currentJobs}
                    onToggleStatus={handleToggleStatus}
                    onDeleteJob={handleDeleteJob}
                    onEditJob={handleEditClick}
                    onViewJob={handleViewClick}
                />
            )}

            {jobs.length > 0 && (
                <div className="pagination">
                    <Pagination currentPage={currentPage - 1} setCurrentPage={setCurrentPage} totalPages={totalPages} />
                </div>
            )}

            <JobFormModal
                isOpen={isModalOpen}
                mode={modalMode}
                initialData={selectedJob}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
            />
        </div>
    );
}