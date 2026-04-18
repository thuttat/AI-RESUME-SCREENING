import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../apis/AxiosClient";
import { Button } from "../../../components/common/Button";
import { Card } from "../../../components/common/Card";
import { Search, Filter, GitCompare, UserCheck, X } from "lucide-react";
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

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await api.get("/applications");
            setApps(res.data.content || res.data || []);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const filteredApps = apps.filter(app => (
        app.candidateName.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (statusFilter === "ALL" || app.status === statusFilter)
    ));

    return (
        <div className="pipeline-container p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold flex items-center gap-2"><UserCheck/> Pipeline</h1>
                <Button disabled={selectedIds.length < 2} onClick={() => navigate(`/manager/comparison?ids=${selectedIds.join(",")}`)}>
                    <GitCompare size={18}/> So sánh ({selectedIds.length})
                </Button>
            </div>

            <Card className="p-4 mb-6 flex gap-4 items-center border-none shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18}/>
                    <input className="w-full pl-10 pr-4 py-2 border rounded-xl outline-none" placeholder="Tìm tên..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}/>
                </div>
                <select className="p-2 border rounded-xl outline-none" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                    <option value="ALL">Tất cả trạng thái</option>
                    <option value="PENDING">PENDING</option>
                    <option value="SHORTLIST">SHORTLIST</option>
                    <option value="HIRED">HIRED</option>
                    <option value="REJECT">REJECT</option>
                </select>
            </Card>

            <PipelineTable loading={loading} 
                data={filteredApps} 
                selectedIds={selectedIds} 
                onToggle={id => setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])} 
                onView={setViewingApp} onEvaluate={setEvaluatingApp} 
            />

            {evaluatingApp && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="w-full max-w-2xl relative">
                        <button className="absolute -top-10 right-0 text-white" onClick={() => setEvaluatingApp(null)}><X size={30}/></button>
                        <EvaluationForm appId={evaluatingApp.id} candidateName={evaluatingApp.candidateName} onClose={() => { setEvaluatingApp(null); loadData(); }} />
                    </div>
                </div>
            )}

            <CandidateDetailModal isOpen={!!viewingApp} app={viewingApp} onClose={() => setViewingApp(null)} onEvaluate={app => { setViewingApp(null); setEvaluatingApp(app); }} />
        </div>
    );
}