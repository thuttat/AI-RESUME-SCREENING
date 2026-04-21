import React from 'react';
import { Badge } from '../../../../components/common/Badge';
import { X, Star, FileText, BrainCircuit } from 'lucide-react';

export default function CandidateDetailModal({ data, onClose }) {
    if (!data) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-backdrop" onClick={onClose}></div>

            <div className="modal-container detail-modal">
                <div className="modal-header">
                    <h3 className="modal-title">Review: {data.candidateName}</h3>
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className="modal-body">
                    <div className="detail-layout">
                        <div className="detail-left">
                            <div className="detail-item">
                                <label className="detail-label">
                                    <Star size={14} /> AI Match Score
                                </label>
                                <h2 className="detail-score">{data.matchScore}%</h2>
                            </div>

                            <div className="detail-item">
                                <label className="detail-label">
                                    <Star size={14} /> Extracted Skills
                                </label>
                                <div className="detail-skills">
                                    {data.extractedSkills ? data.extractedSkills.split(',').map((s, i) => (
                                        <Badge key={i} variant="outline">{s.trim()}</Badge>
                                    )) : <span className="detail-no-skills">No skills extracted</span>}
                                </div>
                            </div>

                            <div className="detail-item">
                                <label className="detail-label">
                                    <FileText size={14} /> Experience
                                </label>
                                <p className="detail-exp">{data.yearsOfExperience} years</p>
                            </div>
                        </div>

                        <div className="detail-right">
                            <label className="critique-label">
                                <BrainCircuit size={18} /> AI Critique
                            </label>
                            <p className="critique-text">
                                {data.critique || "AI did not provide a critique for this candidate."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}