import React, { useState } from "react";
import { Card, CardHeader, CardBody } from "../../../../components/common/Card";
import { Badge } from "../../../../components/common/Badge";
import { Button } from "../../../../components/common/Button";
import { Pencil, X } from "lucide-react";

export default function RecentApplications({ applications, onUpdateStatus, onViewAll }) {
    const [editingApp, setEditingApp] = useState(null);

    const handleQuickUpdate = (status) => {
        onUpdateStatus(editingApp.id, status);
        setEditingApp(null);
    };

    return (
        <>
            <Card className="recent-apps-card shadow-sm border-none">
                <CardHeader className="flex justify-between items-center border-b p-4">
                    <h2 className="font-bold text-gray-800">Recent Applications</h2>
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
                                    <th className="p-4">Job Position</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Quick Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y">
                                {applications.map(app => (
                                    <tr key={app.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4">
                                            <div className="font-bold text-gray-800">{app.candidateName}</div>
                                            <div className="text-xs text-gray-400">{app.candidateEmail}</div>
                                        </td>
                                        <td className="p-4 text-gray-600">{app.jobTitle || "Developer"}</td>
                                        <td className="p-4">
                                            <Badge variant={app.status?.toLowerCase()}>{app.status}</Badge>
                                        </td>
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => setEditingApp(app)}
                                                className="p-2 text-gray-400 hover:text-primary transition-colors"
                                            >
                                                <Pencil size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardBody>
            </Card>

            {/* QUICK STATUS EDIT MODAL */}
            {editingApp && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in">
                    <div className="bg-white p-6 rounded-2xl shadow-2xl w-full max-w-xs relative">
                        <button className="absolute top-4 right-4 text-gray-400" onClick={() => setEditingApp(null)}>
                            <X size={20} />
                        </button>
                        <h3 className="font-bold text-lg mb-1">Update Status</h3>
                        <p className="text-sm text-gray-500 mb-6">{editingApp.candidateName}</p>
                        <div className="space-y-4">
                            <select 
                                defaultValue={editingApp.status}
                                onChange={(e) => handleQuickUpdate(e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none font-medium"
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