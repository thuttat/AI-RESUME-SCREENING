import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Thêm điều hướng
import api from "../../api/AxiosClient";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

import { 
    Users, 
    Clock, 
    UserCheck, 
    UserX, 
    TrendingUp, 
    ArrowRight,
    Pencil,
    X
} from "lucide-react";

export default function HiringManagerDashboard() {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        hired: 0,
        rejected: 0
    });
    const [recentApps, setRecentApps] = useState([]);
    const [loading, setLoading] = useState(false);
    
    const [editingApp, setEditingApp] = useState(null);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            const response = await api.get("/applications");
            const data = response.data.content || response.data || [];

            setStats({
                total: data.length,
                pending: data.filter(a => a.status === 'PENDING').length,
                hired: data.filter(a => a.status === 'HIRED').length,
                rejected: data.filter(a => a.status === 'REJECT').length,
            });

            setRecentApps(data.slice(0, 5));
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu Dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (appId, newStatus) => {
        try {
            await api.patch(`/applications/${appId}/status`, { 
                status: newStatus,
                note: "Cập nhật nhanh từ Dashboard" 
            });
            alert("Cập nhật thành công!");
            setEditingApp(null); 
            fetchDashboardData(); 
        } catch (error) {
            alert("Lỗi khi cập nhật!");
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* 1. Header Area */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Hiring Manager Dashboard</h1>
                <p className="text-gray-500 text-sm">Tổng quan tiến độ tuyển dụng và các hồ sơ cần phê duyệt.</p>
            </div>

            {/* 2. Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <Card className="p-4 border-l-4 border-blue-500 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Tổng ứng viên</p>
                            <h3 className="text-2xl font-bold">{stats.total}</h3>
                        </div>
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                            <Users size={24} />
                        </div>
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-yellow-500 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Chờ đánh giá</p>
                            <h3 className="text-2xl font-bold">{stats.pending}</h3>
                        </div>
                        <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
                            <Clock size={24} />
                        </div>
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-green-500 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Đã tuyển (Hired)</p>
                            <h3 className="text-2xl font-bold">{stats.hired}</h3>
                        </div>
                        <div className="p-2 bg-green-50 text-green-600 rounded-lg">
                            <UserCheck size={24} />
                        </div>
                    </div>
                </Card>

                <Card className="p-4 border-l-4 border-red-500 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 font-medium">Từ chối</p>
                            <h3 className="text-2xl font-bold">{stats.rejected}</h3>
                        </div>
                        <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                            <UserX size={24} />
                        </div>
                    </div>
                </Card>
            </div>

            {/* 3. Main Content */}
            <div className="grid grid-cols-1 gap-6">
                <Card className="p-0 overflow-hidden border-none shadow-lg">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <TrendingUp size={18} className="text-blue-500" />
                            Ứng viên mới cần phản hồi
                        </h3>
                        <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-blue-600 border-blue-200"
                            onClick={() => navigate("/manager/pipeline?filter=ALL")}
                        >
                            Xem tất cả <ArrowRight size={14} className="ml-1" />
                        </Button>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Ứng viên</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Vị trí</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Trạng thái</th>
                                    <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Thao tác</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-400">Đang tải dữ liệu...</td>
                                    </tr>
                                ) : recentApps.length === 0 ? (
                                    <tr>
                                        <td colSpan="4" className="px-6 py-8 text-center text-gray-400">Không có ứng viên nào.</td>
                                    </tr>
                                ) : recentApps.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">{app.candidateName}</span>
                                                <span className="text-xs text-gray-500">{app.candidateEmail}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {app.jobTitle}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={app.status?.toLowerCase()}>
                                                {app.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button 
                                                variant="ghost" 
                                                size="sm" 
                                                className="text-blue-600" 
                                                onClick={() => setEditingApp(app)}
                                            >
                                                <Pencil size={16} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>

            {/* MODAL SỬA NHANH TRẠNG THÁI */}
            {editingApp && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-xl shadow-xl w-80">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold">Đổi trạng thái nhanh</h3>
                            <button onClick={() => setEditingApp(null)}><X size={18}/></button>
                        </div>
                        <p className="text-sm text-gray-500 mb-4 font-medium">{editingApp.candidateName}</p>
                        <select 
                            defaultValue={editingApp.status}
                            onChange={(e) => updateStatus(editingApp.id, e.target.value)}
                            className="w-full p-2 border rounded-lg mb-4 outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="PENDING">PENDING</option>
                            <option value="SHORTLIST">SHORTLIST</option>
                            <option value="HIRED">HIRED</option>
                            <option value="REJECT">REJECT</option>
                        </select>
                        <Button fullWidth onClick={() => setEditingApp(null)} variant="outline">Hủy</Button>
                    </div>
                </div>
            )}
        </div>
    );
}