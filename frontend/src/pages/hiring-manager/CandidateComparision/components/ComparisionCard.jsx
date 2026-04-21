import React from "react";
import { BrainCircuit, Star, Mail, Briefcase, FileText } from "lucide-react";
import { Card, CardBody } from "../../../../components/common/Card";
import { Badge } from "../../../../components/common/Badge";
import { Button } from "../../../../components/common/Button";

export default function ComparisonCard({ candidate, onAction }) {
    const skills = candidate.extractedSkills ? candidate.extractedSkills.split(",") : [];

    return (
        <Card className="comparison-item border-none shadow-sm h-full bg-white ring-1 ring-gray-100">
            <CardBody className="p-6 flex flex-col gap-6">
                {/* 1. Profile Header */}
                <div className="flex flex-col items-center text-center">
                    <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center text-2xl font-bold mb-3">
                        {candidate.candidateName?.charAt(0)}
                    </div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{candidate.candidateName}</h3>
                    <p className="text-gray-400 text-xs flex items-center gap-1 mt-1">
                        <Mail size={12}/> {candidate.candidateEmail}
                    </p>
                </div>

                <div className="h-px bg-gray-50 w-full" />

                {/* 2. AI Score & Exp */}
                <div className="grid grid-cols-2 gap-2">
                    <div className="bg-indigo-50/50 p-3 rounded-xl text-center border border-indigo-100">
                        <div className="text-indigo-600 font-bold text-lg leading-none flex items-center justify-center gap-1">
                            <Star size={14} className="fill-indigo-600"/> {candidate.matchScore}%
                        </div>
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">AI Score</span>
                    </div>
                    <div className="bg-emerald-50/50 p-3 rounded-xl text-center border border-emerald-100">
                        <div className="text-emerald-600 font-bold text-lg leading-none">
                            {candidate.yearsOfExperience || 'N/A'}
                        </div>
                        <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Years Exp</span>
                    </div>
                </div>

                {/* 3. Skills */}
                <div>
                    <h4 className="text-[11px] font-bold text-gray-400 uppercase mb-3 flex items-center gap-1">
                        <Briefcase size={12}/> Skills Highlight
                    </h4>
                    <div className="flex flex-wrap gap-1.5 h-20 overflow-y-auto pr-1 scrollbar-hide">
                        {skills.map((s, idx) => (
                            <Badge key={idx} variant="primary" className="text-[11px] px-2 py-0.5">
                                {s.trim()}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* 4. AI Critique */}
                <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 flex-1">
                    <h4 className="text-[11px] font-bold text-amber-600 uppercase mb-2 flex items-center gap-1">
                        <BrainCircuit size={12}/> AI Analysis
                    </h4>
                    <p className="text-gray-600 text-xs leading-relaxed italic">
                        "{candidate.critique || "good skills"}"
                    </p>
                </div>

                {/* 5. Footer Action */}
                <Button 
                    fullWidth 
                    variant="outline" 
                    size="sm" 
                    onClick={() => onAction(candidate)}
                    className="border-indigo-100 text-indigo-600 hover:bg-indigo-50"
                >
                    <FileText size={14} /> Full Details
                </Button>
            </CardBody>
        </Card>
    );
}