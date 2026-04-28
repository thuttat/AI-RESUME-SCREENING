import { Edit2, Trash2, Briefcase, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { format } from 'date-fns';

export default function JobGrid({ templates, onEdit, onDelete, onToggleActive }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {templates.map((template) => (
        <div key={template.id} className="!bg-white !border !border-gray-200 !rounded-2xl !p-6 !shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:!shadow-[0_8px_24px_rgba(0,0,0,0.08)] !transition-all !flex !flex-col !h-full">
          <div className="!flex !items-start !gap-4 !mb-5">
            <div className="flex items-center gap-3">
              <div className="!w-14 !h-14 !bg-blue-50/80 !rounded-xl !flex !items-center !justify-center !shrink-0">
                <Briefcase size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="!text-slate-800 !font-bold !text-[17px] !leading-tight !m-0">{template.title}</h3>
                <p className="!text-[13px] !text-slate-500 !mt-1 !m-0">{template.department}</p>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <button
              onClick={() => onToggleActive(template.id)}
              className={clsx(
                '!inline-flex !items-center !justify-center !w-fit !h-auto gap-1.5 !px-3 !py-1 text-xs font-semibold rounded-full transition-colors',
                template.isActive ? '!bg-green-50/80 !text-green-600 !border-green-100 hover:!bg-green-100' : '!bg-slate-50 !text-slate-500 !border-slate-200 hover:!bg-slate-100'
              )}
            >
              {template.isActive ? <><CheckCircle2 size={12} /> Active</> : <><XCircle size={12} /> Inactive</>}
            </button>
          </div>

          <p className="!text-[14px] !text-slate-600 !mb-5 !leading-relaxed !line-clamp-2 !m-0">{template.description}</p>

          <div className="!flex-grow !mb-5">
            <span className="!text-[#ff4d4f] !font-bold !text-[11px] !uppercase !tracking-[0.1em] !block !mb-1.5">Requirements</span>
            <p className="text-sm text-gray-600 mt-1">{template.requirements}</p>
          </div>

          <div className="flex items-center justify-between border-t border-gray-50 pt-4">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Calendar size={14} />
              <span>
                Updated {template.updatedAt
                  ? format(new Date(template.updatedAt), 'yyyy-MM-dd')
                  : 'N/A'}
              </span>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(template)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"><Edit2 size={16} /></button>
              <button onClick={() => onDelete(template.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 size={16} /></button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}