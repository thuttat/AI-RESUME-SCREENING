import React from "react";
import { X, FileText, BrainCircuit } from "lucide-react";
import { Badge } from "../../../../components/common/Badge";
import { Button } from "../../../../components/common/Button";

export default function CandidateDetailModal({ isOpen, onClose, app, onEvaluate }) {
    if (!isOpen || !app) return null;

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
                <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold">Candidate details</h2>
                    <button onClick={onClose}><X size={24}/></button>
                </div>
                <div className="p-8 overflow-y-auto flex-1">
                    <div className="grid grid-cols-2 gap-8 mb-8">
                        <div><label className="text-xs font-bold text-gray-400 uppercase">Họ tên</label><p className="text-lg font-bold">{app.candidateName}</p></div>
                        <div><label className="text-xs font-bold text-gray-400 uppercase">Trạng thái</label><br/><Badge variant={app.status?.toLowerCase()}>{app.status}</Badge></div>
                    </div>
                    <div className="bg-amber-50 p-6 rounded-xl border-l-4 border-amber-400">
                        <h4 className="flex items-center gap-2 font-bold text-amber-800 mb-2"><BrainCircuit size={18}/> AI Critique</h4>
                        <p className="text-amber-900 leading-relaxed italic">"{app.critique || "AI did not parse this cv"}"</p>
                    </div>
                </div>
                <div className="p-4 border-t bg-white flex justify-between">
                    <Button variant="outline" onClick={() => window.open(app.cvFileUrl, '_blank')}><FileText size={18} className="mr-2"/> watch CV</Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose}>Đóng</Button>
                        <Button variant="primary" onClick={() => onEvaluate(app)}>Evaluate</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}