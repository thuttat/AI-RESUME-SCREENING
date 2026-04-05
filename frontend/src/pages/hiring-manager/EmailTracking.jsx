import React, { useState, useEffect } from "react";
import api from "../../services/api";
import { Card } from "../../components/common/Card";
import { Badge } from "../../components/common/Badge";
import { Mail, CheckCircle2, XCircle } from "lucide-react";

export default function EmailTracking() {
    const [logs, setLogs] = useState([]);

    useEffect(() => {
        api.get("/email-logs").then(res => setLogs(res.data)).catch(console.error);
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Mail className="text-blue-500" /> Nhật Ký Email
            </h1>

            <div className="grid gap-4">
                {logs.map(log => (
                    <Card key={log.id} className="p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${log.status === 'SENT' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                {log.status === 'SENT' ? <CheckCircle2 size={24}/> : <XCircle size={24}/>}
                            </div>
                            <div>
                                <div className="font-semibold">{log.subject}</div>
                                <div className="text-sm text-gray-500 italic">Tới: {log.application?.cv?.candidateEmail}</div>
                            </div>
                        </div>
                        <div className="text-right">
                            <Badge variant={log.status === 'SENT' ? 'success' : 'danger'}>{log.status}</Badge>
                            <div className="text-xs text-gray-400 mt-1">{new Date(log.sentAt).toLocaleString()}</div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}