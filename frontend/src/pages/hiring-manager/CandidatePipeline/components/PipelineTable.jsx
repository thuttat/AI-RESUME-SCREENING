import React from "react";
import { Loader2 } from "lucide-react";
import PipelineRow from "./PipelineRow";

export default function PipelineTable({ loading, data, selectedIds, onToggle, onView, onEvaluate, onUpdateStatus }) {
    if (loading) return (
        <div className="p-24 text-center bg-white rounded-2xl shadow-sm border border-slate-100">
            <Loader2 className="animate-spin inline text-indigo-600 mb-2" size={32}/>
            <p className="text-slate-500 font-medium">Loading applications...</p>
        </div>
    );

    return (
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                    <th className="p-4 w-12 text-center"></th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Candidate</th>
                    <th className="p-4 text-center text-xs font-bold text-slate-500 uppercase tracking-wider">AI Score</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Applied Date</th>
                    <th className="p-4 text-right text-xs font-bold text-slate-500 uppercase tracking-wider px-6">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                {data.length === 0 ? (
                    <tr><td colSpan="6" className="p-12 text-center text-slate-400 font-medium">No candidates found</td></tr>
                ) : (
                    data.map(app => (
                        <PipelineRow
                            key={app.id}
                            app={app}
                            isSelected={selectedIds.includes(app.id)}
                            onToggle={onToggle}
                            onView={onView}
                            onEvaluate={onEvaluate}
                            onUpdateStatus={onUpdateStatus}
                        />
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
}