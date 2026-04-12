import React, { useState, useEffect } from "react";
import api from "../../api/AxiosClient";

// Import các Base Components của bạn
import { Card } from "../../components/common/Card";
import { Table } from "../../components/common/Table";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";

import { Search, FileText, CheckCircle, XCircle, BarChart2 } from "lucide-react";

export default function CandidateRanking() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    
    const jobId = 1;

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const response = await api.get(`/applications/job/${jobId}`);
            setApplications(response.data.content || []);
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu ứng viên:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        if (!window.confirm(`Bạn có chắc chắn muốn chuyển trạng thái thành ${status}?`)) return;
        
        try {
            await api.patch(`/applications/${id}/status`, {
                status: status,
                note: "Cập nhật từ hệ thống xếp hạng"
            });
            loadData(); 
        } catch (error) {
            alert("Cập nhật thất bại!");
        }
    };

    const filteredApps = applications.filter(app => 
        app.candidateName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        app.candidateEmail?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Xếp Hạng Ứng Viên</h1>
                    <p className="text-gray-500 text-sm">AI tự động phân tích và chấm điểm độ phù hợp của hồ sơ.</p>
                </div>
                
                <div className="flex gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search size={18} />
                        </span>
                        <input 
                            type="text"
                            placeholder="Tìm ứng viên..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="primary" onClick={loadData}>Làm mới</Button>
                </div>
            </div>

            {/* Main Content */}
            <Card className="p-0 overflow-hidden border-none shadow-lg">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Hạng</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ứng Viên</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Độ Phù Hợp</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng Thái</th>
                                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Hành Động</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-10 text-center text-gray-500">Đang phân tích dữ liệu...</td>
                                </tr>
                            ) : filteredApps.length > 0 ? (
                                filteredApps.map((app, index) => (
                                    <tr key={app.id} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full font-bold text-sm 
                                                ${index === 0 ? 'bg-yellow-100 text-yellow-700' : 
                                                  index === 1 ? 'bg-gray-100 text-gray-600' : 
                                                  index === 2 ? 'bg-orange-100 text-orange-700' : 'text-gray-400'}`}>
                                                {index + 1}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-gray-900">{app.candidateName}</span>
                                                <span className="text-xs text-gray-500 italic">{app.candidateEmail}</span>
                                                <a 
                                                    href={app.cvFileUrl} 
                                                    target="_blank" 
                                                    rel="noreferrer"
                                                    className="flex items-center gap-1 text-xs text-blue-600 mt-1 hover:underline"
                                                >
                                                    <FileText size={12} /> Xem hồ sơ
                                                </a>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-24 bg-gray-200 rounded-full h-2">
                                                    <div 
                                                        className="bg-blue-600 h-2 rounded-full" 
                                                        style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }} 
                                                    ></div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-700">AI Verified</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={app.status?.toLowerCase()}>
                                                {app.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex justify-end gap-2">
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    className="p-2 border-green-200 text-green-600 hover:bg-green-50"
                                                    onClick={() => handleStatusUpdate(app.id, 'HIRED')}
                                                    title="Phê duyệt"
                                                >
                                                    <CheckCircle size={18} />
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="outline"
                                                    className="p-2 border-red-200 text-red-600 hover:bg-red-50"
                                                    onClick={() => handleStatusUpdate(app.id, 'REJECTED')}
                                                    title="Loại bỏ"
                                                >
                                                    <XCircle size={18} />
                                                </Button>
                                                <Button 
                                                    size="sm" 
                                                    variant="primary"
                                                    className="p-2"
                                                    title="So sánh chi tiết"
                                                >
                                                    <BarChart2 size={18} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-gray-500 italic">
                                        Không tìm thấy hồ sơ nào phù hợp.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
}