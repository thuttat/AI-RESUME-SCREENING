import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardBody } from '../../../components/common/Card.jsx';
import { JobService } from "../../../apis/JobService.js";
import { CandidateService } from "../../../apis/CandidateService.js";

import JobSelector from './components/JobSelector.jsx';
import CandidateTable from './components/CandidateTable.jsx';
import BulkAction from './components/BulkAction.jsx';
import Pagination from '../../../components/common/Pagination.jsx';

import './CandidateRanking.css';
import {Button} from "../../../components/common/Button.jsx";
import {Filter, Search} from "lucide-react";

export default function CandidateRanking() {
    const [jobs, setJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        const fetchJobs = async () => {
            const res = await JobService.getOwnJobs();
            setJobs(res.data);
            if (res.data.length > 0) setSelectedJobId(res.data[0].id);
        };
        fetchJobs();
    }, []);

    const fetchCandidates = async () => {
        if (!selectedJobId) return;
        setLoading(true);
        try {
            const res = await JobService.getRankedCandidates(selectedJobId, currentPage, 10);
            setCandidates(res.data.content);
            setTotalPages(res.data.totalPages);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCandidates();
    }, [selectedJobId, currentPage]);

    const handleStatusChange = async (id, status) => {
        await CandidateService.updateStatus(id, { status, note: "" });
        fetchCandidates();
    };

    const filteredCandidates = candidates.filter(c =>
        c.candidateName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="candidate-wrapper">
            <div>
                <h1>Candidate Rankings</h1>
                <p className="page-subtitle">Review and manage candidate applications</p>
            </div>

            <Card>
                <CardHeader>
                    <div className="header-row">
                        <JobSelector
                            jobs={jobs}
                            selectedJobId={selectedJobId}
                            setSelectedJobId={(id) => {
                                setSelectedJobId(id);
                                setCurrentPage(0);
                            }}
                        />

                        <BulkAction
                            selected={selectedCandidates}
                            setSelected={setSelectedCandidates}
                            onAction={handleStatusChange}
                        />
                    </div>
                </CardHeader>

                <CardBody>
                    <div className="toolbar">
                        <div className="search-box">
                            <Search size={18} className="search-icon" />
                            <input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search candidates..."
                            />
                        </div>

                        <Button variant="outline">
                            <Filter size={18} />
                            Filter
                        </Button>
                    </div>

                    <CandidateTable
                        loading={loading}
                        candidates={filteredCandidates}
                        selectedCandidates={selectedCandidates}
                        setSelectedCandidates={setSelectedCandidates}
                        handleStatusChange={handleStatusChange}
                    />

                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                </CardBody>
            </Card>
        </div>
    );
}