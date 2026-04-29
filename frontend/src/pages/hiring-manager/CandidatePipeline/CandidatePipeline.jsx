import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../apis/AxiosClient";
import { Button } from "../../../components/common/Button";
import { Card } from "../../../components/common/Card";
import { Search, GitCompare, UserCheck, X, Check, Filter } from "lucide-react";
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

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await api.get("/applications");
            setApps(res.data.content || res.data || []);
        } catch (error) {
            console.error("Error loading data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickStatusUpdate = async (newStatus) => {
        try {
            const payload = {
                status: newStatus,
                note: "Status updated via quick action"
            };
            await api.patch(`/applications/${statusUpdateApp.id}/status`, payload);
            setStatusUpdateApp(null);
            loadData();
        } catch (error) {
            console.error("Update status failed:", error);
        }
    };

    const filteredApps = apps.filter(app => (
        app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "ALL" || app.status === statusFilter)
    ));

    return (
        <div className="pipeline-container p-8 bg-slate-50 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                        <UserCheck className="text-indigo-600" size={32}/> Candidate Pipeline
                    </h1>
                    <p className="text-slate-500 mt-1">Track and manage candidates through the hiring process</p>
                </div>
                <Button
                    variant="primary"
                    disabled={selectedIds.length < 2}
                    onClick={() => navigate(`/manager/comparison?ids=${selectedIds.join(",")}`)}
                    className="shadow-sm"
                >
                    <GitCompare size={18} className="mr-2"/> Compare ({selectedIds.length})
                </Button>
            </div>

            <Card className="p-4 mb-6 flex gap-4 items-center border-none shadow-sm">
                <div className="search-box-wrapper flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18}/>
                    <input
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
                        placeholder="Search candidate name..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl">
                    <Filter size={16} className="text-slate-400"/>
                    <select
                        className="bg-transparent outline-none text-slate-600 font-medium cursor-pointer"
                        value={statusFilter}
                        onChange={e => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="PENDING">PENDING</option>
                        <option value="SHORTLIST">SHORTLIST</option>
                        <option value="HIRED">HIRED</option>
                        <option value="REJECT">REJECT</option>
                    </select>
                </div>
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
                <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-[60] p-4">
                    <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl animate-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-bold text-lg text-slate-800">Change Status</h3>
                            <button onClick={() => setStatusUpdateApp(null)} className="text-slate-400 hover:text-slate-600">
                                <X size={20}/>
                            </button>
                        </div>
                        <div className="space-y-2">
                            {['PENDING', 'SHORTLIST', 'HIRED', 'REJECT'].map(s => (
                                <button
                                    key={s}
                                    className={`w-full p-3 rounded-xl border text-left flex justify-between items-center transition-all ${statusUpdateApp.status === s ? 'border-indigo-600 bg-indigo-50 text-indigo-600 font-bold' : 'border-slate-100 hover:bg-slate-50 text-slate-600'}`}
                                    onClick={() => handleQuickStatusUpdate(s)}
                                >
                                    {s}
                                    {statusUpdateApp.status === s && <Check size={16}/>}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {evaluatingApp && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-2xl relative">
                        <button className="absolute -top-10 right-0 text-white" onClick={() => setEvaluatingApp(null)}>
                            <X size={30}/>
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