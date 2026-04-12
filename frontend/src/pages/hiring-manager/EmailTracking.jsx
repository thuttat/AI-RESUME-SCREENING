import React, { useState, useEffect } from "react";
import api from "../../api/AxiosClient";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Mail, CheckCircle2, XCircle, Loader2, Clock } from "lucide-react";

export default function EmailLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/email-logs")
            .then(res => {
                const data = res.data.content || res.data || [];
                setLogs(Array.isArray(data) ? data : []);
            })
            .catch(err => console.error("Lỗi tải logs:", err))
            .finally(() => setLoading(false));
    }, []);

    const getStatusStyle = (status) => {
        switch (status) {
            case 'SENT': return { bg: 'bg-green-50 text-green-600', icon: <CheckCircle2 size={24}/>, badge: 'success' };
            case 'FAILED': return { bg: 'bg-red-50 text-red-600', icon: <XCircle size={24}/>, badge: 'danger' };
            default: return { bg: 'bg-amber-50 text-amber-600', icon: <Clock size={24}/>, badge: 'warning' };
        }
    };

    return (
        <div className="p-6 max-w-5xl mx-auto">
            <div className="mb-8 border-b border-gray-200 pb-6">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-xl">
                        <Mail className="text-blue-600" size={28} />
                    </div>
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Nhật Ký Gửi Email</h1>
                        <p className="text-gray-500 mt-1 text-sm">Theo dõi trạng thái các thư đã tự động gửi đến ứng viên.</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-4 animate-in fade-in">
                {loading ? (
                    <div className="flex flex-col items-center py-20 text-gray-400">
                        <Loader2 className="animate-spin mb-4" size={32} /> Đang tải dữ liệu...
                    </div>
                ) : logs.length === 0 ? (
                    <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed text-gray-500">
                        Chưa có email nào được gửi.
                    </div>
                ) : (
                    logs.map(log => {
                        const style = getStatusStyle(log.status);
                        const recipientEmail = log.candidateEmail || "Không xác định";
                        
                        return (
                            <Card key={log.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-start sm:items-center gap-4">
                                    <div className={`p-3 rounded-full flex-shrink-0 ${style.bg}`}>{style.icon}</div>
                                    <div>
                                        <div className="font-bold text-gray-900 text-lg mb-1">{log.subject}</div>
                                        <div className="text-sm text-gray-600">
                                            Tới: <span className="font-medium text-indigo-600">{recipientEmail}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-left sm:text-right mt-4 sm:mt-0">
                                    <Badge variant={style.badge} className="mb-2 px-3 py-1 font-bold">{log.status || 'PENDING'}</Badge>
                                    <div className="text-xs text-gray-400 font-medium flex items-center gap-1 justify-end">
                                        <Clock size={12} /> {log.sentAt ? new Date(log.sentAt).toLocaleString('vi-VN') : 'Đang chờ...'}
                                    </div>
                                </div>
                            </Card>
                        );
                    })
                )}
            </div>
        </div>
    );
}