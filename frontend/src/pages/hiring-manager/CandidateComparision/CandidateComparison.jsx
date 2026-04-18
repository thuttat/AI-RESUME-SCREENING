import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../../apis/AxiosClient";
import { GitCompare, ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import { Button } from "../../../components/common/Button";
import ComparisonCard from "./components/ComparisionCard";
import "./CandidateComparison.css";

export default function CandidateComparison() {
    const location = useLocation();
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const ids = queryParams.get("ids")?.split(",") || [];

    useEffect(() => {
        if (ids.length > 0) {
            fetchComparisonData();
        }
    }, [location.search]);

    const fetchComparisonData = async () => {
        try {
            const results = await Promise.all(
                ids.map(id => api.get(`/applications/${id}`))
            );
            setCandidates(results.map(res => res.data));
        } catch (error) {
            console.error("Lỗi tải so sánh:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-96 flex-col items-center justify-center gap-4">
                <Loader2 className="animate-spin text-primary" size={40} />
                <p className="text-gray-500 font-medium">Comparing data...</p>
            </div>
        );
    }

    return (
        <div className="comparison-workspace p-6">
            <header className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={() => navigate(-1)}
                        className="p-2 hover:bg-white rounded-full transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <GitCompare className="text-primary" /> Candidate Comparison
                        </h1>
                        <p className="text-gray-500">Compare candidates</p>
                    </div>
                </div>
                <div className="text-sm font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-xl">
                    {candidates.length} candidates compared
                </div>
            </header>

            {candidates.length === 0 ? (
                <div className="bg-white rounded-2xl p-20 text-center flex flex-col items-center">
                    <AlertCircle size={48} className="text-gray-300 mb-4" />
                    <p className="text-gray-400 font-medium">Have no data to compare.</p>
                    <Button onClick={() => navigate('/manager/pipeline')} className="mt-4" variant="outline">Go back</Button>
                </div>
            ) : (
                <div className="comparison-grid">
                    {candidates.map(can => (
                        <ComparisonCard 
                            key={can.id} 
                            candidate={can} 
                            onAction={(app) => navigate(`/manager/pipeline?id=${app.id}`)} 
                        />
                    ))}
                </div>
            )}
        </div>
    );
}