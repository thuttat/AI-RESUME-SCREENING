import React from "react";
import { X, FileText, BrainCircuit, Award, Calendar, Mail, Briefcase, CheckCircle2 } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

export default function CandidateDetailModal({ isOpen, onClose, app, onEvaluate }) {
    if (!isOpen || !app) return null;

    const skills = app.extractedSkills ? app.extractedSkills.split(",") : ["Java", "Spring Boot", "SQL", "React"];
    const experience = app.yearsOfExperience || 3.5;
    const critique = app.critique || "Ứng viên có nền tảng kỹ thuật tốt, phù hợp với định hướng phát triển của team. Tuy nhiên cần kiểm tra thêm về khả năng làm việc nhóm.";

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                
                {/* 1. HEADER */}
                <div className="flex justify-between items-start p-6 border-b border-gray-100 bg-gray-50/50">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-2xl font-bold">
                            {app.candidateName?.charAt(0) || "U"}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">{app.candidateName}</h2>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <span className="flex items-center gap-1"><Mail size={14}/> {app.candidateEmail}</span>
                                <span className="flex items-center gap-1"><Briefcase size={14}/> {app.jobTitle}</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* 2. BODY (Scrollable) */}
                <div className="p-6 overflow-y-auto flex-1 bg-gray-50/30">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        
                        {/* Cột Trái: Đánh giá của AI */}
                        <div className="md:col-span-2 space-y-6">
                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold flex items-center gap-2 mb-4 text-indigo-700">
                                    <BrainCircuit size={20}/> AI Phân Tích & Nhận Xét
                                </h3>
                                <p className="text-gray-700 leading-relaxed bg-indigo-50 p-4 rounded-lg italic">
                                    "{critique}"
                                </p>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <h3 className="text-lg font-bold mb-4">Kỹ năng trích xuất (Extracted Skills)</h3>
                                <div className="flex flex-wrap gap-2">
                                    {skills.map((skill, index) => (
                                        <span key={index} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg flex items-center gap-1">
                                            <CheckCircle2 size={14} className="text-green-500"/> {skill.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Cột Phải: Thống kê nhanh & Actions */}
                        <div className="space-y-6">
                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center text-center">
                                <div className="w-24 h-24 rounded-full border-4 border-indigo-500 flex items-center justify-center mb-3 shadow-inner">
                                    <span className="text-3xl font-bold text-indigo-600">{app.matchScore || 85}%</span>
                                </div>
                                <h3 className="font-bold text-gray-900">Độ Phù Hợp (Match)</h3>
                                <p className="text-sm text-gray-500">Dựa trên yêu cầu của JD</p>
                            </div>

                            <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Calendar size={20}/></div>
                                    <div>
                                        <p className="text-sm text-gray-500">Kinh nghiệm</p>
                                        <p className="font-bold">{experience} năm</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-50 text-green-600 rounded-lg"><Award size={20}/></div>
                                    <div>
                                        <p className="text-sm text-gray-500">Trạng thái hiện tại</p>
                                        <Badge variant={app.status?.toLowerCase()}>{app.status}</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                {/* 3. FOOTER */}
                <div className="p-4 border-t border-gray-100 bg-white flex justify-between items-center">
                    <Button 
                        variant="outline" 
                        className="text-gray-600"
                        onClick={() => window.open(app.cvFileUrl || '#', '_blank')}
                    >
                        <FileText size={18} className="mr-2"/> Xem File CV Gốc (PDF)
                    </Button>
                    
                    <div className="flex gap-3">
                        <Button variant="outline" onClick={onClose}>Đóng</Button>
                        <Button 
                            variant="primary" 
                            className="bg-indigo-600 hover:bg-indigo-700"
                            onClick={() => {
                                onClose();
                                onEvaluate(app); 
                            }}
                        >
                            Đánh giá ứng viên này
                        </Button>
                    </div>
                </div>

            </div>
        </div>
    );
}