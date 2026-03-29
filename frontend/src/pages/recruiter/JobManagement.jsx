import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { Plus } from 'lucide-react';
import JobTable from './components/JobTable';
import JobFormModal from './components/JobFormModal';
import './styles/JobManagement.css';

const mockJobs = [
    { id: 1, title: 'Senior React Developer', applicants: 45, status: 'open', postedDate: '2026-03-01' },
    { id: 2, title: 'Senior Front-end Developer', applicants: 20, status: 'close', postedDate: '2026-03-10' },
    { id: 3, title: 'Fresher Back-end Developer', applicants: 75, status: 'open', postedDate: '2026-03-05' },
    { id: 4, title: 'Fresher Back-end Developer', applicants: 75, status: 'open', postedDate: '2026-03-05' },
    { id: 5, title: 'Fresher Back-end Developer', applicants: 75, status: 'close', postedDate: '2026-03-07' },
    { id: 6, title: 'Fresher Back-end Developer', applicants: 75, status: 'open', postedDate: '2026-03-05' },
    { id: 7, title: 'Fresher Back-end Developer', applicants: 75, status: 'open', postedDate: '2026-03-05' },
    { id: 8, title: 'Fresher Back-end Developer', applicants: 75, status: 'close', postedDate: '2026-03-04' },
    { id: 9, title: 'Fresher Back-end Developer', applicants: 75, status: 'open', postedDate: '2026-03-05' },
    { id: 10, title: 'Fresher Back-end Developer', applicants: 75, status: 'open', postedDate: '2026-03-05' },
    { id: 11, title: 'Fresher Back-end Developer', applicants: 75, status: 'open', postedDate: '2026-03-05' },
];

export default function JobManagement() {
    const [jobs, setJobs] = useState(mockJobs);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleCreateJob = (newJob) => {
        setJobs([
            ...jobs,
            {
                ...newJob,
                id: Date.now(),
                applicants: 0,
                status: 'open',
                postedDate: new Date().toISOString().slice(0, 10),
            },
        ]);
    };

    const sortJobs = (jobs) => {
        return [...jobs].sort((a, b) => {
            if (a.status !== b.status) {
                return a.status === 'open' ? -1 : 1;
            }
            return new Date(b.postedDate) - new Date(a.postedDate);
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
                    <h3>All Jobs</h3>
                    <p className="job-subtitle">Manage job postings</p>
                </div>

                <Button onClick={() => setIsModalOpen(true)}>
                    <Plus size={18} />
                    Create Job
                </Button>
            </div>

            <JobTable jobs={currentJobs} />

            <div className="pagination">
                <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                >
                    Prev
                </Button>

                <span>Page {currentPage} / {totalPages}</span>

                <Button
                    variant="primary"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                >
                    Next
                </Button>
            </div>

            <JobFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateJob}
            />
        </div>
    );
}