import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../apis/AxiosClient";
import { Button } from "../../../components/common/Button";
import { Card } from "../../../components/common/Card";
import { Search, GitCompare, UserCheck, X, Check } from "lucide-react";
import PipelineTable from "./components/PipelineTable";
import EvaluationForm from "./components/EvaluationForm";
import CandidateDetailModal from "./components/CandidateDetailModal";
import "./CandidatePipeline.css";

export default function CandidatePipeline() {
    const navigate = useNavigate();
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedIds, setSelectedIds] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [viewingApp, setViewingApp] = useState(null);
    const [evaluatingApp, setEvaluatingApp] = useState(null);
    const [statusUpdateApp, setStatusUpdateApp] = useState(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await api.get("/applications");
            setApps(res.data.content || res.data || []);
        } catch (error) {
            console.error("Error loading applications:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickStatusUpdate = async (newStatus) => {
        try {
            const payload = {
                status: newStatus,
                note: "Status updated via quick action menu"
            };

            await api.patch(`/applications/${statusUpdateApp.id}/status`, payload);

            setStatusUpdateApp(null);
            loadData();
        } catch (error) {
            console.error("Update status failed:", error);
            alert("Failed to update status. Please ensure the Backend is running and the URL is correct.");
        }
    };

    const filteredApps = apps.filter(app => (
        app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "ALL" || app.status === statusFilter)
    ));

    return (
        <div className="pipeline-container p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2"><UserCheck/> Candidate Pipeline</h1>
                <Button
                    disabled={selectedIds.length < 2}
                    onClick={() => navigate(`/manager/comparison?ids=${selectedIds.join(",")}`)}
                >
                    <GitCompare size={18}/> Compare ({selectedIds.length})
                </Button>
            </div>

            <Card className="p-4 mb-6 flex gap-4 items-center border-none shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <input
                        className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none focus:border-indigo-500"
                        placeholder="Search candidate name..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <select
                    className="p-2 border rounded-xl outline-none focus:border-indigo-500"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                >
                    <option value="ALL">All Statuses</option>
                    <option value="PENDING">PENDING</option>
                    <option value="SHORTLIST">SHORTLIST</option>
                    <option value="HIRED">HIRED</option>
                    <option value="REJECT">REJECT</option>
                </select>
            </Card>

            <PipelineTable
                loading={loading}
                data={filteredApps}
                selectedIds={selectedIds}
                onToggle={id => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])}
                onView={setViewingApp}
                onEvaluate={setEvaluatingApp}
                onUpdateStatus={setStatusUpdateApp}
            />

            {statusUpdateApp && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl animate-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-4 border-b pb-2">
                            <h3 className="font-bold text-lg text-gray-800">Update Status</h3>
                            <button className="text-gray-400 hover:text-gray-600" onClick={() => setStatusUpdateApp(null)}>
                                <X size={24}/>
                            </button>
                        </div>
                        <p className="text-sm text-gray-500 mb-4">Updating status for: <span className="font-semibold text-gray-700">{statusUpdateApp.candidateName}</span></p>
                        <div className="grid gap-2">
                            {['PENDING', 'SHORTLIST', 'HIRED', 'REJECT'].map(s => (
                                <button
                                    key={s}
                                    className={`p-3 rounded-xl border text-left flex justify-between items-center hover:bg-indigo-50 transition-all ${statusUpdateApp.status === s ? 'border-indigo-600 bg-indigo-50 text-indigo-600' : 'border-gray-200 text-gray-600'}`}
                                    onClick={() => handleQuickStatusUpdate(s)}
                                >
                                    <span className="font-medium">{s}</span>
                                    {statusUpdateApp.status === s && <Check size={18} className="text-indigo-600"/>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {evaluatingApp && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-2xl relative">
                        <button
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                            onClick={() => setEvaluatingApp(null)}
                        >
                            <X size={36}/>
                        </button>
                        <EvaluationForm
                            appId={evaluatingApp.id}
                            candidateName={evaluatingApp.candidateName}
                            onClose={() => { setEvaluatingApp(null); loadData(); }}
                        />
                    </div>
                </div>
            )}

            <CandidateDetailModal
                isOpen={!!viewingApp}
                app={viewingApp}
                onClose={() => setViewingApp(null)}
                onEvaluate={app => { setViewingApp(null); setEvaluatingApp(app); }}
            />
        </div>
    );
}