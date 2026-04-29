import React from "react";
import { Eye, Star, Pencil } from "lucide-react";
import { Badge } from "../../../../components/common/Badge";

export default function PipelineRow({ app, isSelected, onToggle, onView, onEvaluate, onUpdateStatus }) {
    return (
        <tr className={`hover:bg-slate-50/80 transition-colors ${isSelected ? 'bg-indigo-50/40' : ''}`}>
            <td className="p-4 text-center">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => onToggle(app.id)}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer"
                />
            </td>
            <td className="p-4">
                <div className="font-bold text-slate-800">{app.candidateName}</div>
                <div className="text-xs text-slate-400">{app.candidateEmail}</div>
            </td>
            <td className="p-4 text-center">
                <div className="inline-flex items-center gap-1 font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-xs border border-indigo-100">
                    <Star size={12} className="fill-indigo-600" /> {app.matchScore || 0}%
                </div>
            </td>
            <td className="p-4">
                <Badge variant={app.status?.toLowerCase()}>{app.status}</Badge>
            </td>
            <td className="p-4 text-sm text-slate-500">
                {new Date(app.createdAt).toLocaleDateString()}
            </td>
            <td className="p-4 text-right px-6">
                <div className="flex justify-end gap-1">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-white rounded-lg transition-all" onClick={() => onView(app)} title="Details">
                        <Eye size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-amber-600 hover:bg-white rounded-lg transition-all" onClick={() => onUpdateStatus(app)} title="Status">
                        <Pencil size={18} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-white rounded-lg transition-all" onClick={() => onEvaluate(app)} title="Evaluate">
                        <Star size={18} />
                    </button>
                </div>
            </td>
        </tr>
    );
}