import {Table, TableHeader, TableBody, TableRow, TableHead} from '../../../components/common/Table';
import CandidateRow from './CandidateRow';

export default function CandidateTable({
                                           loading,
                                           candidates,
                                           selectedCandidates,
                                           setSelectedCandidates,
                                           handleStatusChange
                                       }) {

    if (loading) {
        return <p className="loading-text">Loading candidates...</p>;
    }

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>
                        <input
                            type="checkbox"
                            onChange={(e) =>
                                setSelectedCandidates(
                                    e.target.checked
                                        ? candidates.map(c => c.applicationId)
                                        : []
                                )
                            }
                            checked={
                                candidates.length > 0 &&
                                selectedCandidates.length === candidates.length
                            }
                        />
                    </TableHead>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Score</TableHead>
                    <TableHead>Skills</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {candidates.map(c => (
                    <CandidateRow
                        key={c.applicationId}
                        c={c}
                        selectedCandidates={selectedCandidates}
                        setSelectedCandidates={setSelectedCandidates}
                        handleStatusChange={handleStatusChange}
                    />
                ))}
            </TableBody>
        </Table>
    );
}