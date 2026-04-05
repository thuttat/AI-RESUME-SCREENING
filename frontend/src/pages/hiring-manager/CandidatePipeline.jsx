import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Search, Filter, Eye, Star } from "lucide-react";

export default function CandidatePipeline() {
    const [apps, setApps] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => { loadData(); }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const res = await api.get("/applications");
            setApps(res.data.content || []);
        } catch (error) { console.error(error); } finally { setLoading(false); }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-end mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Duyệt Ứng Viên</h1>
                    <p className="text-gray-500">Danh sách chờ Sếp phê duyệt offer hoặc từ chối.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                        <input className="pl-10 pr-4 py-2 border rounded-lg" placeholder="Tìm theo tên..." />
                    </div>
                    <Button variant="outline"><Filter size={18} className="mr-2"/> Lọc</Button>
                </div>
            </div>

            <Card className="p-0 border-none shadow-md overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="px-6 py-4">Hồ sơ</th>
                            <th className="px-6 py-4">Vị trí ứng tuyển</th>
                            <th className="px-6 py-4">AI Score</th>
                            <th className="px-6 py-4">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {apps.map(app => (
                            <tr key={app.id} className="hover:bg-gray-50 transition-all">
                                <td className="px-6 py-4">
                                    <div className="font-semibold text-gray-900">{app.cv?.candidateName}</div>
                                    <div className="text-xs text-gray-400">{app.cv?.candidateEmail}</div>
                                </td>
                                <td className="px-6 py-4 text-sm">{app.jobPosting?.title}</td>
                                <td className="px-6 py-4">
                                    <Badge className="bg-blue-100 text-blue-700">
                                        <Star size={12} className="mr-1 fill-blue-700"/> 
                                        {app.cv?.aiAnalysisResult?.matchScore || "85"}%
                                    </Badge>
                                </td>
                                <td className="px-6 py-4">
                                    <Button variant="ghost" className="text-blue-600 hover:bg-blue-50">
                                        <Eye size={18} className="mr-1"/> Chi tiết
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}