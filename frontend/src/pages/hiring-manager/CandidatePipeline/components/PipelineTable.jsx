import React from "react";
import { Loader2 } from "lucide-react";
import PipelineRow from "./PipelineRow";

export default function PipelineTable({ loading, data, selectedIds, onToggle, onView, onEvaluate, onUpdateStatus }) {
    if (loading) return (
        <div className="p-20 text-center"><Loader2 className="animate-spin inline mr-2"/> <span className="text-gray-500">Loading...</span></div>
    );

    return (
        <div className="overflow-x-auto rounded-xl border bg-white shadow-sm">
            <table className="w-full text-left">
                <thead className="bg-gray-50 border-b text-xs uppercase text-gray-500 font-bold">
                <tr>
                    <th className="p-4 w-10 text-center"></th>
                    <th className="p-4">Candidate</th>
                    <th className="p-4 text-center">AI score</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Applied date</th>
                    <th className="p-4 text-right">Action</th>
                </tr>
                </thead>
                <tbody className="divide-y">
                {data.length === 0 ? (
                    <tr><td colSpan="6" className="p-10 text-center text-gray-400">Have no data</td></tr>
                ) : (
                    data.map(app => (
                        <PipelineRow
                            key={app.id} app={app}
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