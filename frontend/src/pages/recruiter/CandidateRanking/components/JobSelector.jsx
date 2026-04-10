export default function JobSelector({ jobs, selectedJobId, setSelectedJobId }) {
    return (
        <div className="job-selector">
            <h4>Select Job:</h4>
            <select
                value={selectedJobId}
                onChange={(e) => setSelectedJobId(e.target.value)}
                className="job-select"
            >
                {jobs.map(job => (
                    <option key={job.id} value={job.id}>
                        {job.title}
                    </option>
                ))}
            </select>
        </div>
    );
}