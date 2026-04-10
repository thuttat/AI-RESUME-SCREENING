import { Badge } from '../../../components/common/Badge';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

export default function CandidateRow({
                                         c,
                                         selectedCandidates,
                                         setSelectedCandidates,
                                         handleStatusChange
                                     }) {

    const skillArray = c.extractedSkills
        ? c.extractedSkills.split(',').map(s => s.trim())
        : [];

    const toggleSelect = () => {
        setSelectedCandidates(prev =>
            prev.includes(c.applicationId)
                ? prev.filter(id => id !== c.applicationId)
                : [...prev, c.applicationId]
        );
    };

    const getScoreColor = (score) => {
        if (!score) return "score-low";
        if (score >= 90) return 'score-high';
        if (score >= 75) return 'score-good';
        if (score >= 60) return 'score-medium';
        return 'score-low';
    };

    return (
        <tr className="table-row" style={{padding:'10px'}}>
            <td>
                <input
                    type="checkbox"
                    checked={selectedCandidates.includes(c.applicationId)}
                    onChange={toggleSelect}
                />
            </td>

            <td>
                <p className="candidate-name">{c.candidateName}</p>
                <p className="candidate-email">{c.candidateEmail}</p>
            </td>

            <td>
                <div className="score-circle" title={c.critique}>
                    <span className={getScoreColor(c.matchScore)}>
                        {c.matchScore ? `${c.matchScore}%` : "N/A"}
                    </span>
                </div>
            </td>

            <td>
                <div className="skills">
                    {skillArray.slice(0, 2).map((s, i) => (
                        <Badge key={i} variant="primary">{s}</Badge>
                    ))}
                    {skillArray.length > 2 && (
                        <Badge>+{skillArray.length - 2}</Badge>
                    )}
                </div>
            </td>

            <td>
                {c.yearsOfExperience
                    ? `${c.yearsOfExperience} years`
                    : "N/A"}
            </td>

            <td>
                <Badge
                    variant={
                        c.status === 'SHORTLIST'
                            ? 'success'
                            : c.status === 'REJECT'
                                ? 'danger'
                                : 'default'
                    }
                >
                    {c.status}
                </Badge>
            </td>

            <td>
                <div className="actions">
                    <button
                        className="btn-icon success"
                        onClick={() => handleStatusChange(c.applicationId, 'SHORTLIST')}
                    >
                        <ThumbsUp size={16}/>
                    </button>

                    <button
                        className="btn-icon danger"
                        onClick={() => handleStatusChange(c.applicationId, 'REJECT')}
                    >
                        <ThumbsDown size={16}/>
                    </button>
                </div>
            </td>
        </tr>
    );
}