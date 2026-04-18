import React from 'react';
import { Card, CardHeader, CardBody } from '../../../../components/common/Card.jsx';
import { Badge } from '../../../../components/common/Badge.jsx';
import { Clock, Loader2 } from 'lucide-react';
import Pagination from "../../../../components/common/Pagination.jsx";

export default function EmailHistory({ history, loading, currentPage, totalPages, setCurrentPage }) {
    const safeHistory = Array.isArray(history) ? history : [];

    const formatTime = (time) => {
        if (!time) return "Processing...";
        const date = new Date(time);
        return isNaN(date) ? "Runtime error" : date.toLocaleString();
    };

    if (loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '50px', color: 'var(--primary)' }}>
                <Loader2 className="spinner" size={32} />
            </div>
        );
    }

    return (
        <Card className="history-card">
            <CardHeader className="history-card-header">
                <h4 className="history-card-title">
                    <Clock size={18}/> Email history ({safeHistory.length})
                </h4>
            </CardHeader>
            <CardBody className="history-card-body">
                {safeHistory.length === 0 ? (
                    <div className="history-empty-msg">
                        No emails were sent.
                    </div>
                ) : (
                    <table className="history-table">
                        <thead className="history-table-header">
                        <tr>
                            <th style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>Candidate</th>
                            <th style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>Subject</th>
                            <th style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>Sent at</th>
                            <th style={{ padding: '12px 20px', borderBottom: '1px solid var(--border)', fontWeight: 600 }}>Status</th>
                        </tr>
                        </thead>
                        <tbody>
                        {safeHistory.map((log) => (
                            <tr key={log.id} className="history-table-row">
                                <td>
                                    <div className="history-candidate-cell">
                                        <span className="history-candidate-name">{log.candidateName}</span>
                                        <span className="history-candidate-email">{log.candidateEmail}</span>
                                    </div>
                                </td>
                                <td>{log.subject}</td>
                                <td className="history-time-cell">{formatTime(log.sentAt)}</td>
                                <td>
                                    <Badge variant={log.status === 'SENT' ? 'success' : log.status === 'PENDING' ? 'warning' : 'danger'}>
                                        {log.status}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}

                {!loading && totalPages > 1 && (
                    <div className="history-pagination-wrapper">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                )}
            </CardBody>
        </Card>
    );
}