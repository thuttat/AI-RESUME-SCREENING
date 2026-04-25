import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "../../../../components/common/Card";
import { Badge } from "../../../../components/common/Badge";
import { Button } from "../../../../components/common/Button";
import { Pencil, X } from "lucide-react";

export default function RecentApplications({ applications, onUpdateStatus, onViewAll }) {
    const [editingApp, setEditingApp] = useState(null);

    const handleQuickUpdate = (status) => {
        if(editingApp) {
            onUpdateStatus(editingApp.id, status);
            setEditingApp(null);
        }
    };

    const formatDate = (dateString) => {
        if(!dateString) return "N/A";
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    return (
        <>
            <Card className="recent-apps-card shadow-sm border-none">
                <CardHeader className="flex justify-between items-center border-b p-4">
                    <h2 className="font-bold text-gray-800">Recent Activities</h2>
                    <button onClick={onViewAll} className="text-primary text-sm hover:underline font-medium">
                        See all candidates
                    </button>
                </CardHeader>
                <CardBody className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-400 text-xs uppercase font-bold">
                            <tr>
                                <th className="p-4">Candidate</th>
                                <th className="p-4">Job Title</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Date</th>
                                <th className="p-4 text-right">Action</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                            {applications && applications.length > 0 ? (
                                applications.map((app) => (
                                    <tr key={app.id} className="hover:bg-gray-50/50 transition-colors">
                                        <td className="p-4 font-medium text-gray-900">{app.candidateName || "Unknown"}</td>
                                        <td className="p-4 text-gray-500">{app.jobTitle || "N/A"}</td>
                                        <td className="p-4">
                                            <Badge variant={app.status === 'HIRED' ? 'success' : app.status === 'REJECT' ? 'danger' : 'warning'}>
                                                {app.status}
                                            </Badge>
                                        </td>
                                        <td className="p-4 text-sm text-gray-500">{formatDate(app.createdAt)}</td>
                                        <td className="p-4 text-right">
                                            <Button size="sm" variant="outline" onClick={() => setEditingApp(app)}>
                                                <Pencil size={14} className="mr-1" /> Update
                                            </Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="p-8 text-center text-gray-500">No recent activities found.</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

            {editingApp && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-xs relative">
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" onClick={() => setEditingApp(null)}>
                            <X size={20} />
                        </button>
                        <h3 className="font-bold text-lg mb-1">Update Status</h3>
                        <p className="text-sm text-gray-500 mb-6">{editingApp.candidateName}</p>
                        <div className="space-y-4">
                            <select
                                defaultValue={editingApp.status}
                                onChange={(e) => handleQuickUpdate(e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-medium focus:border-primary"
                            >
                                <option value="PENDING">PENDING</option>
                                <option value="SHORTLIST">SHORTLIST</option>
                                <option value="HIRED">HIRED</option>
                                <option value="REJECT">REJECT</option>
                            </select>
                            <Button fullWidth onClick={() => setEditingApp(null)} variant="outline">Cancel</Button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}