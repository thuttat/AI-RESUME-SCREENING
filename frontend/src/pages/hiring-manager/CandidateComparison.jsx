import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/AxiosClient";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { Badge } from "../../components/common/Badge";
import { 
    ArrowLeft, 
    GitCompare, 
    Star, 
    Calendar, 
    BrainCircuit, 
    CheckCircle2,
    AlertCircle
} from "lucide-react";

export default function CandidateComparison() {
    const location = useLocation();
    const navigate = useNavigate();
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(false);

    const queryParams = new URLSearchParams(location.search);
    const ids = queryParams.get("ids")?.split(",") || [];

    useEffect(() => {
        if (ids.length > 0) {
            fetchCandidates();
        }
    }, []);

    const fetchCandidates = async () => {
        try {
            setLoading(true);
            const results = await Promise.all(
                ids.map(id => api.get(`/applications/${id}`))
            );
            setCandidates(results.map(res => res.data));
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu so sánh:", error);
        } finally {
            setLoading(false);
        }
    };

    if (ids.length < 2) {
        return (
            <div className="p-10 text-center">
                <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
                <h2 className="text-xl font-bold">Cần ít nhất 2 ứng viên để so sánh</h2>
                <Button onClick={() => navigate(-1)} className="mt-4">Quay lại danh sách</Button>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2">
                            <GitCompare className="text-indigo-600" /> So sánh ứng viên
                        </h1>
                        <p className="text-gray-500 text-sm">Phân tích chuyên sâu các chỉ số giữa {candidates.length} ứng viên.</p>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="text-center py-20 text-gray-400">Đang phân tích dữ liệu so sánh...</div>
            ) : (
                <div className={`grid grid-cols-1 md:grid-cols-${candidates.length} gap-6`}>
                    {candidates.map((can) => (
                        <Card key={can.id} className="relative border-t-4 border-indigo-500 shadow-xl overflow-visible">
                            {/* AI Match Score Badge */}
                            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow-lg border border-indigo-100 flex items-center gap-1">
                                <Star size={16} className="text-yellow-400 fill-yellow-400" />
                                <span className="font-bold text-indigo-700">{can.matchScore || 85}% Match</span>
                            </div>

                            <div className="pt-6 pb-4 px-6 text-center border-b border-gray-50">
                                <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl font-bold text-gray-400">
                                    {can.candidateName?.charAt(0)}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900">{can.candidateName}</h3>
                                <p className="text-sm text-gray-500">{can.candidateEmail}</p>
                                <Badge className="mt-2" variant={can.status?.toLowerCase()}>{can.status}</Badge>
                            </div>

                            {/* Comparison Rows */}
                            <div className="p-6 space-y-8">
                                {/* Kinh nghiệm */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                        <Calendar size={14}/> Kinh nghiệm
                                    </h4>
                                    <p className="text-lg font-semibold text-gray-800">{can.yearsOfExperience || "3.5"} năm</p>
                                </div>

                                {/* Kỹ năng chính */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-1">
                                        <CheckCircle2 size={14}/> Kỹ năng nổi bật
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {(can.extractedSkills || "Java, Spring, SQL").split(",").map((s, i) => (
                                            <span key={i} className="text-[11px] px-2 py-1 bg-indigo-50 text-indigo-600 rounded font-medium">
                                                {s.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* AI Critique */}
                                <div>
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                        <BrainCircuit size={14}/> Nhận xét từ AI
                                    </h4>
                                    <p className="text-sm text-gray-600 leading-relaxed italic bg-gray-50 p-3 rounded-lg border-l-2 border-gray-200">
                                        "{can.critique || "Ứng viên có tiềm năng lớn..."}"
                                    </p>
                                </div>

                                {/* Action */}
                                <div className="pt-4">
                                    <Button 
                                        fullWidth 
                                        variant="outline" 
                                        onClick={() => navigate(`/manager/pipeline?id=${can.id}`)}
                                        className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                                    >
                                        Xem chi tiết & Chốt
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}