import { Edit2, Trash2, Eye, Mail } from 'lucide-react';
import { clsx } from 'clsx';

export default function EmailTable({ templates, onEdit, onDelete, onPreview }) {
  const getTypeColor = (type) => {
    switch (type) {
      case 'Offer': return 'bg-green-100 text-green-700';
      case 'Reject': return 'bg-red-100 text-red-700';
      case 'Interview': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-gray-50/50 text-left">
            <th className="!px-4 !py-3 text-sm font-semibold text-gray-700">ID</th>
            <th className="!px-4 !py-3 text-sm font-semibold text-gray-700">Email Type</th>
            <th className="!px-4 !py-3 text-sm font-semibold text-gray-700">Subject Line</th>
            <th className="!px-4 !py-3 text-sm font-semibold text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody>
          {templates.map((template) => (
            <tr key={template.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
              <td className="!px-4 !py-4 text-sm text-gray-700">{template.id}</td>
              <td className="!px-4 !py-4">
                <span className={clsx(
                  '!inline-flex !items-center !justify-center !w-fit !h-auto gap-1.5 !px-3 !py-1 text-xs font-semibold rounded-full',
                  getTypeColor(template.type)
                )}>
                  <Mail size={12} /> {template.type}
                </span>
              </td>
              <td className="px-4 py-4 text-sm text-gray-900">{template.subject}</td>
              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <button onClick={() => onPreview(template)} className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg" title="Preview"><Eye size={16} /></button>
                  <button onClick={() => onEdit(template)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg" title="Edit"><Edit2 size={16} /></button>
                  <button onClick={() => onDelete(template.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 size={16} /></button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}