import React from "react";
import { Eye, Star, Pencil } from "lucide-react";
import { Badge } from "../../../../components/common/Badge";

export default function PipelineRow({ app, isSelected, onToggle, onView, onEvaluate, onUpdateStatus }) {
    return (
        <tr className={`hover:bg-gray-50 transition-colors border-b ${isSelected ? 'bg-indigo-50/30' : ''}`}>
            <td className="p-4 text-center">
                <input type="checkbox" checked={isSelected} onChange={() => onToggle(app.id)} className="w-4 h-4 rounded text-primary cursor-pointer"/>
            </td>
            <td className="p-4">
                <div className="font-bold text-gray-800">{app.candidateName}</div>
                <div className="text-xs text-gray-400">{app.candidateEmail}</div>
            </td>
            <td className="p-4 text-center">
                <div className="inline-flex items-center gap-1 font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full text-sm">
                    <Star size={14} className="fill-indigo-600" /> {app.matchScore || 0}%
                </div>
            </td>
            <td className="p-4">
                <Badge variant={app.status?.toLowerCase()}>{app.status}</Badge>
            </td>
            <td className="p-4 text-sm text-gray-500">
                {new Date(app.createdAt).toLocaleDateString('vi-VN')}
            </td>
            <td className="p-4 text-right">
                <div className="flex justify-end gap-1">
                    <button className="p-2 text-gray-400 hover:text-primary transition-all" onClick={() => onView(app)} title="Details"><Eye size={20} /></button>

                    <button className="p-2 text-gray-400 hover:text-amber-600 transition-all" onClick={() => onUpdateStatus(app)} title="Change status"><Pencil size={20} /></button>

                    <button className="p-2 text-gray-400 hover:text-green-600 transition-all" onClick={() => onEvaluate(app)} title="Rating"><Star size={20} /></button>
                </div>
            </td>
        </tr>
    );
}