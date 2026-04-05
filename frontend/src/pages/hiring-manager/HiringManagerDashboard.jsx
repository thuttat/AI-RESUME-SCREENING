import React, { useState, useEffect } from "react";
import api from "../../services/api";

// Import đúng bộ nhận diện thương hiệu của bạn
import { Card } from "../../components/common/Card";
import { Table } from "../../components/common/Table";
import { Badge } from "../../components/common/Badge";
import { Button } from "../../components/common/Button";

// Icons để trang trí cho "Sếp"
import { 
    Users, 
    Clock, 
    UserCheck, 
    UserX, 
    TrendingUp, 
    ArrowRight 
} from "lucide-react";

export default function HiringManagerDashboard() {
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        hired: 0,
        rejected: 0
    });
    const [recentApps, setRecentApps] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);
            // Giả sử bạn có endpoint tổng hợp hoặc lấy từ danh sách
            const response = await api.get("/applications");
            const data = response.data.content || [];
            
            // Tính toán nhanh số liệu (Mock logic)
            setStats({
                total: data.length,
                pending: data.filter(a => a.status === 'PENDING').length,
                hired: data.filter(a => a.status === 'HIRED').length,
                rejected: data.filter(a => a.status === 'REJECT').length,
            });
            
            // Lấy 5 ứng viên mới nhất để hiện ở trang chủ
            setRecentApps(data.slice(0, 5));
        } catch (error) {
            console.error("Lỗi khi tải dữ liệu Dashboard:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            {/* 1. Header Area */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Hiring Manager Dashboard</h1>
                <p className="text-gray-500 text-sm">Tổng quan tiến độ tuyển dụng và các hồ sơ cần phê duyệt.</p>
            </div>

            {/* 2. Stats Grid - Dùng Card của bạn */}
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

            {/* 3. Main Content - Recent Activity Table */}
            <div className="grid grid-cols-1 gap-6">
                <Card className="p-0 overflow-hidden border-none shadow-lg">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-white">
                        <h3 className="font-bold text-gray-800 flex items-center gap-2">
                            <TrendingUp size={18} className="text-blue-500" />
                            Ứng viên mới cần phản hồi
                        </h3>
                        <Button variant="outline" size="sm" className="text-blue-600 border-blue-200">
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
                                ) : recentApps.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-gray-900">{app.cv?.candidateName}</span>
                                                <span className="text-xs text-gray-500">{app.cv?.candidateEmail}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {app.jobPosting?.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant={app.status?.toLowerCase()}>
                                                {app.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="sm" className="text-blue-600">
                                                Chi tiết
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </Card>
            </div>
        </div>
    );
}