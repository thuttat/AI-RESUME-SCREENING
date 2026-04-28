import React from "react";
import { X, FileText, BrainCircuit, Target, Briefcase, Award } from "lucide-react";
import { Badge } from "../../../../components/common/Badge";
import { Button } from "../../../../components/common/Button";

export default function CandidateDetailModal({ isOpen, onClose, app, onEvaluate }) {
    if (!isOpen || !app) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in duration-200">

                {/* Header */}
                <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-800">Candidate Details</h2>
                    <button
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={onClose}
                    >
                        <X size={24}/>
                    </button>
                </div>

                {/* Content */}
                <div className="p-8 overflow-y-auto flex-1">

                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Full Name</label>
                            <p className="text-lg font-bold text-gray-900">{app.candidateName}</p>
                        </div>
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Status</label>
                            <div className="mt-1">
                                <Badge variant={app.status?.toLowerCase()}>{app.status}</Badge>
                            </div>
                        </div>
                    </div>

                    {/* AI Score & Key Metrics */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                        <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100 flex flex-col items-center">
                            <Target className="text-indigo-600 mb-1" size={20}/>
                            <span className="text-xs text-indigo-600 font-medium">Match Score</span>
                            <span className="text-2xl font-black text-indigo-700">
                                {app.matchScore != null ? `${app.matchScore}%` : "N/A"}
                            </span>
                        </div>
                        <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 flex flex-col items-center">
                            <Briefcase className="text-blue-600 mb-1" size={20}/>
                            <span className="text-xs text-blue-600 font-medium">Experience</span>
                            <span className="text-2xl font-black text-blue-700">
                                {app.yearsOfExperience != null ? `${app.yearsOfExperience}Y` : "N/A"}
                            </span>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex flex-col items-center">
                            <Award className="text-purple-600 mb-1" size={20}/>
                            <span className="text-xs text-purple-600 font-medium">Skills Found</span>
                            <span className="text-sm font-bold text-purple-700 text-center line-clamp-1">
                                {app.extractedSkills || "None"}
                            </span>
                        </div>
                    </div>

                    {/* AI Critique Section */}
                    <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-400 mb-6">
                        <h4 className="flex items-center gap-2 font-bold text-amber-800 mb-2">
                            <BrainCircuit size={18}/> AI Analysis Critique
                        </h4>
                        <p className="text-amber-900 leading-relaxed italic">
                            "{app.critique || "AI has not performed an analysis for this candidate yet."}"
                        </p>
                    </div>

                    {/* Skills Breakdown (Optional) */}
                    {app.extractedSkills && (
                        <div>
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 block">Extracted Skills</label>
                            <div className="flex flex-wrap gap-2">
                                {app.extractedSkills.split(',').map((skill, index) => (
                                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-lg text-sm font-medium">
                                        {skill.trim()}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                    <Button
                        variant="outline"
                        onClick={() => window.open(app.cvFileUrl, '_blank')}
                    >
                        <FileText size={18} className="mr-2"/> View Resume (PDF)
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose}>Close</Button>
                        <Button variant="primary" onClick={() => onEvaluate(app)}>Evaluate & Feedback</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}