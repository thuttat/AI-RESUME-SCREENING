import React from 'react';
import InfoRow from './InfoRow';
import {Button} from "../../../components/common/Button.jsx";

const ApplicationCard = ({ app, onParse, onRemove }) => {
    const s = app.status;

    return (
        <div className={`app-card card-${s.toLowerCase()}`}>
            <div className="card-top">
                <div className="file-info">
                    <div>
                        <span className="file-name">{app.fileName}</span>
                        <span className="file-size">{app.fileSize}</span>
                    </div>
                </div>

                <span className={`status-badge badge-${s.toLowerCase()}`}>
                    {s}
                </span>
            </div>

            <div className="card-body">
                {s === 'ERROR' ? (
                    <div className="error-box">
                        <p>{app.errorDetail}</p>
                    </div>
                ) : (
                    <>
                        <InfoRow label="Candidate" value={app.candidateName} />
                        <InfoRow label="Email" value={app.candidateEmail} />

                        {s === 'SUCCESS' && (
                            <div className="fade-in">
                                <div className="score-row">
                                    <span className="score-label">Matching score:</span>
                                    <span className="score-value">{app.matchScore}%</span>
                                </div>

                                <p className="skills-text">
                                    <strong>Skills:</strong> {app.skills}
                                </p>

                                <div className="critique-box">
                                    <strong style={{ color: '#d97706', fontStyle: 'normal' }}>💡 AI Critique:</strong> <br/>
                                    {app.critique}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            <div className="card-footer">
                {s === 'PENDING' && (
                    <Button variant="primary" className="btn-action" onClick={() => onParse(app.id)}>
                        Run AI
                    </Button>
                )}

                {s === 'PARSING' && (
                    <Button variant="outline" className="btn-action" disabled>
                        <div className="spinner"></div> Processing
                    </Button>
                )}

                {(s === 'SUCCESS' || s === 'ERROR') && (
                    <Button variant="outline-danger" className="btn-action" onClick={() => onRemove(app.id)}>
                        Delete
                    </Button>
                )}
            </div>
        </div>
    );
};

export default ApplicationCard;