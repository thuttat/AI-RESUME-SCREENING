import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/AxiosClient";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Search, Eye, Star, CheckSquare, GitCompare, X } from "lucide-react";
import EvaluationForm from "../hiring-manager/components/EvaluationForm"; 
import CandidateDetailModal from "./CandidateDetailModal";

export default function CandidatePipeline() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewingApp, setViewingApp] = useState(null);
    const [selectedIds, setSelectedIds] = useState([]);
    const [evaluatingApp, setEvaluatingApp] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    
    const navigate = useNavigate();

    useEffect(() => { 
        loadData(); 
    }, []); 

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await api.get("/applications"); 
            const data = res.data.content || res.data || [];
            setApps(data);
        } catch (error) { 
            console.error(error); 
        } finally { 
            setLoading(false); 
        }
    };

    const toggleSelect = (id) => {
        setSelectedIds(prev => 
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleCompare = () => {
        if (selectedIds.length < 2) {
            alert("Vui lòng chọn ít nhất 2 ứng viên để so sánh!");
            return;
        }
        navigate(`/manager/comparison?ids=${selectedIds.join(",")}`);
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Quản lý Ứng Viên</h1>
                    <p className="text-gray-500 mt-1">Toàn bộ hồ sơ trong luồng tuyển dụng và trạng thái chi tiết.</p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative flex-grow md:w-72">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all shadow-sm"
                            placeholder="Tìm kiếm ứng viên..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    
                    {selectedIds.length > 0 && (
                        <button 
                            onClick={handleCompare}
                            className="flex items-center justify-center px-4 py-2 border border-transparent text-sm font-bold rounded-xl text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all active:scale-95"
                        >
                            <GitCompare size={18} className="mr-2"/> So sánh ({selectedIds.length})
                        </button>
                    )}
                </div>
            </div>

            {/* Table Section */}
            <Card className="overflow-hidden border-none shadow-2xl rounded-2xl bg-white">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100">
                                <th className="px-6 py-4 w-12 text-center">
                                    <CheckSquare size={18} className="text-gray-300 mx-auto"/>
                                </th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Hồ sơ</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Vị trí</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider">Trạng thái</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-center">AI / Manager Score</th>
                                <th className="px-6 py-4 text-xs font-bold text-gray-400 uppercase tracking-wider text-right">Thao tác</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {loading ? (
                                <tr><td colSpan="6" className="px-6 py-20 text-center text-gray-400 animate-pulse font-medium">Đang đồng bộ dữ liệu...</td></tr>
                            ) : apps.length === 0 ? (
                                <tr><td colSpan="6" className="px-6 py-20 text-center text-gray-400 italic">Danh sách trống.</td></tr>
                            ) : apps.map(app => (
                                <tr key={app.id} className={`group hover:bg-indigo-50/30 transition-all duration-200 ${selectedIds.includes(app.id) ? 'bg-indigo-50' : ''}`}>
                                    <td className="px-6 py-4 text-center">
                                        <input 
                                            type="checkbox" 
                                            className="w-5 h-5 text-indigo-600 border-gray-300 rounded-lg focus:ring-indigo-500 cursor-pointer transition-all"
                                            checked={selectedIds.includes(app.id)}
                                            onChange={() => toggleSelect(app.id)}
                                        />
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">{app.candidateName}</span>
                                            <span className="text-xs text-gray-500">{app.candidateEmail}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="text-sm font-medium text-gray-600">{app.jobTitle}</span>
                                    </td>
                                    {/* CỘT TRẠNG THÁI RIÊNG BIỆT */}
                                    <td className="px-6 py-4">
                                        <Badge variant={app.status?.toLowerCase()} className="capitalize px-3 py-1 text-[11px] font-bold">
                                            {app.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col items-center gap-1.5">
                                            <Badge className="bg-blue-50 text-blue-700 border border-blue-100 px-2 py-0.5 w-fit flex items-center">
                                                <Star size={10} className="mr-1 fill-blue-700"/> AI: {app.matchScore || "85"}%
                                            </Badge>
                                            {app.evaluations?.length > 0 && (
                                                <Badge className="bg-amber-50 text-amber-700 border border-amber-100 px-2 py-0.5 w-fit flex items-center">
                                                    <Star size={10} className="mr-1 fill-amber-700"/> Sếp: {app.evaluations[0].rating}/5
                                                </Badge>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <button 
                                            onClick={() => setViewingApp(app)}
                                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                        >
                                            <Eye size={16} className="mr-1.5"/> Xem CV
                                        </button>
                                        <button 
                                            onClick={() => setEvaluatingApp(app)}
                                            className={`inline-flex items-center px-4 py-1.5 text-sm font-bold rounded-xl transition-all shadow-sm ${
                                                app.evaluations?.length > 0 
                                                ? "text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-200" 
                                                : "text-white bg-indigo-600 hover:bg-indigo-700"
                                            }`}
                                        >
                                            {app.evaluations?.length > 0 ? "Sửa" : "Đánh giá"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>

            {/* Modal Components */}
            {evaluatingApp && (
                <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                    <div className="w-full max-w-2xl relative">
                        <button 
                            className="absolute -top-12 right-0 md:-right-12 p-2 text-white hover:bg-white/20 rounded-full transition-all"
                            onClick={() => setEvaluatingApp(null)}
                        >
                            <X size={28} />
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
                onClose={() => setViewingApp(null)} 
                app={viewingApp}
                onEvaluate={(appToEvaluate) => { setViewingApp(null); setEvaluatingApp(appToEvaluate); }} 
            />
        </div>
    );
}