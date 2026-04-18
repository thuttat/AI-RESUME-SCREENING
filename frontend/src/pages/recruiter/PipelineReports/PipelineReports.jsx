import React, { useState, useEffect } from 'react';
import { Card } from '../../../components/common/Card.jsx';
import { Loader2 } from 'lucide-react';
import { ReportService } from '../../../apis/ReportService.js';
import { JobService } from '../../../apis/JobService.js';
import OverviewChart from './components/OverviewChart.jsx';
import StatsColumn from './components/StatsColumn.jsx';
import SkillChart from './components/SkillChart.jsx';
import './PipelineReports.css';

export default function PipelineReports() {
    const [globalStats, setGlobalStats] = useState(null);
    const [jobReport, setJobReport] = useState(null);
    const [jobs, setJobs] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initData = async () => {
            try {
                const [globalRes, jobsRes] = await Promise.all([
                    ReportService.getOverviewPipeline(),
                    JobService.getOwnJobs()
                ]);
                setGlobalStats(globalRes.data);
                setJobs(jobsRes.data);
                if (jobsRes.data.length > 0) setSelectedJobId(jobsRes.data[0].id);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        initData();
    }, []);

    useEffect(() => {
        if (!selectedJobId) return;
        ReportService.getJobDetail(selectedJobId)
            .then(res => setJobReport(res.data));
    }, [selectedJobId]);

    if (loading || !globalStats)
        return (
            <div className="pipeline-loading">
                <Loader2 className="spinner" size={32} />
            </div>
        );

    return (
        <div className="pipeline-wrapper">
            <div className="pipeline-header">
                <div>
                    <h1>Recruitment Analytics</h1>
                    <p className="page-subtitle">Comprehensive view of your hiring pipeline</p>
                </div>

                <select
                    className="job-selector"
                    value={selectedJobId}
                    onChange={e => setSelectedJobId(e.target.value)}
                >
                    {jobs.map(j => (
                        <option key={j.id} value={j.id}>{j.title}</option>
                    ))}
                </select>
            </div>

            <div className="pipeline-grid-top">
                <OverviewChart globalStats={globalStats} />
                <StatsColumn jobReport={jobReport} />
            </div>

            <SkillChart jobReport={jobReport} />
        </div>
    );
}