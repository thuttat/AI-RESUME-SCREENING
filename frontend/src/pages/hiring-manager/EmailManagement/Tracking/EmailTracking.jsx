import React, { useState, useEffect } from "react";
import api from "../../../../apis/AxiosClient";
import { Card } from "../../../../components/common/Card";
import { Badge } from "../../../../components/common/Badge";
import { Mail, CheckCircle2, XCircle, Clock, Loader2, Search, ArrowRight } from "lucide-react";
import "./EmailTracking.css";

export default function EmailTracking() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        api.get("/email-logs")
            .then(res => setLogs(res.data.content || res.data || []))
            .catch(err => console.error("Lỗi tải lịch sử:", err))
            .finally(() => setLoading(false));
    }, []);

    const filteredLogs = logs.filter(log => 
        log.recipientEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        log.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'SENT': return { bg: 'bg-emerald-50 text-emerald-600', icon: <CheckCircle2 size={22}/>, badge: 'success' };
            case 'FAILED': return { bg: 'bg-rose-50 text-rose-600', icon: <XCircle size={22}/>, badge: 'danger' };
            default: return { bg: 'bg-amber-50 text-amber-600', icon: <Clock size={22}/>, badge: 'warning' };
        }
    };

    return (
        <div className="tracking-container p-6">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <Mail className="text-primary" /> Email Tracking
                    </h1>
                    <p className="text-gray-500">Follow status</p>
                </div>
                <div className="search-container w-full md:w-80">
                    <Search className="search-input-icon" size={18} />
                    <input
                        className="search-input-field"
                        placeholder="Find by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </header>

            <div className="tracking-list space-y-4">
                {loading ? (
                    <div className="flex flex-col items-center p-20 gap-3">
                        <Loader2 className="animate-spin text-primary" size={40} />
                        <p className="text-gray-400 font-medium">Loading...</p>
                    </div>
                ) : filteredLogs.length === 0 ? (
                    <Card className="p-20 text-center text-gray-400 italic bg-white/50 border-dashed">
                        Have no history emails
                    </Card>
                ) : (
                    filteredLogs.map(log => {
                        const style = getStatusStyle(log.status);
                        return (
                            <Card key={log.id} className="tracking-item border-none shadow-sm hover:shadow-md transition-all p-6 bg-white rounded-2xl">
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-5">
                                        <div className={`p-4 rounded-2xl ${style.bg} shrink-0`}>{style.icon}</div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg leading-tight">{log.subject}</h3>
                                            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1">
                                                Tới: <span className="font-semibold text-indigo-600 underline">{log.candidateEmail}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-start sm:items-end gap-2 w-full sm:w-auto border-t sm:border-none pt-4 sm:pt-0">
                                        <Badge variant={style.badge} className="px-4 py-1.5 font-bold uppercase tracking-wider">{log.status}</Badge>
                                        <p className="text-xs text-gray-400 flex items-center gap-1 font-medium">
                                            <Clock size={12}/> {log.sentAt ? new Date(log.sentAt).toLocaleString('vi-VN') : 'Still in queue'}
                                        </p>
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