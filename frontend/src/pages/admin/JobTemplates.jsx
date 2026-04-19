import { useState } from 'react';
import { Plus, Edit2, Trash2, Briefcase, Calendar, CheckCircle2, XCircle } from 'lucide-react';
import Button from './components/Button';
import Modal from './components/Modal';
import { clsx } from 'clsx';


export default function JobTemplates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Senior Frontend Developer',
      department: 'Engineering',
      description: 'We are looking for an experienced Frontend Developer...',
      requirements: 'React, TypeScript, 5+ years experience',
      active: true,
      lastUpdated: '2026-04-10'
    },
    {
      id: 2,
      name: 'Product Manager',
      department: 'Product',
      description: 'Seeking a strategic Product Manager to lead...',
      requirements: 'MBA preferred, 3+ years PM experience',
      active: true,
      lastUpdated: '2026-04-08'
    },
    {
      id: 3,
      name: 'UX Designer',
      department: 'Design',
      description: 'Join our design team to create beautiful user experiences...',
      requirements: 'Figma, Adobe XD, portfolio required',
      active: false,
      lastUpdated: '2026-03-25'
    },
    {
      id: 4,
      name: 'Backend Engineer',
      department: 'Engineering',
      description: 'Build scalable backend systems...',
      requirements: 'Node.js, PostgreSQL, AWS',
      active: true,
      lastUpdated: '2026-04-12'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    department: '',
    description: '',
    requirements: ''
  });

  const handleOpenModal = (template = null) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({
        name: template.name,
        department: template.department,
        description: template.description,
        requirements: template.requirements
      });
    } else {
      setEditingTemplate(null);
      setFormData({
        name: '',
        department: '',
        description: '',
        requirements: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveTemplate = () => {
    if (editingTemplate) {
      setTemplates(
        templates.map((t) =>
          t.id === editingTemplate.id
            ? { ...t, ...formData, lastUpdated: new Date().toISOString().split('T')[0] }
            : t
        )
      );
    } else {
      const newTemplate = {
        id: templates.length + 1,
        ...formData,
        active: true,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setTemplates([...templates, newTemplate]);
    }
    setIsModalOpen(false);
  };

  const handleToggleActive = (id) => {
    setTemplates(
      templates.map((t) => (t.id === id ? { ...t, active: !t.active } : t))
    );
  };

  const handleDeleteTemplate = (id) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter((t) => t.id !== id));
    }
  };

  return (
    <div className="flex flex-col gap-6 p-8 w-full bg-[#f8f9fa] min-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-400">Job Templates</h1>
        <Button variant="primary" icon={Plus} onClick={() => handleOpenModal()} className="!shrink-0 !px-5 !py-2.5">
          Create Template
        </Button>
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template.id}
            className="!bg-white !border !border-gray-200 !rounded-2xl !p-6 !shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:!shadow-[0_8px_24px_rgba(0,0,0,0.08)] !transition-all !flex !flex-col !h-full"
          >
            {/* Card Header */}
            <div className="!flex !items-start !gap-4 !mb-5">
              <div className="flex items-center gap-3">
                <div className="!w-14 !h-14 !bg-blue-50/80 !rounded-xl !flex !items-center !justify-center !shrink-0">
                <Briefcase size={24} className="text-blue-600" />
              </div>
                <div>
                  <h3 className="!text-slate-800 !font-bold !text-[17px] !leading-tight !m-0">{template.name}</h3>
                <p className="!text-[13px] !text-slate-500 !mt-1 !m-0">{template.department}</p>
                </div>
              </div>
            </div>

            {/* Status Badge */}
            <div className="mb-4">
              <button
                onClick={() => handleToggleActive(template.id)}
                className={clsx(
                  '!inline-flex !items-center !justify-center !w-fit !h-auto gap-1.5 !px-3 !py-1 text-xs font-semibold rounded-full transition-colors',
                  template.active
                    ? '!bg-green-50/80 !text-green-600 !border-green-100 hover:!bg-green-100'
                    : '!bg-slate-50 !text-slate-500 !border-slate-200 hover:!bg-slate-100'
                )}
              >
                {template.active ? (
                  <>
                    <CheckCircle2 size={12} />
                    Active
                  </>
                ) : (
                  <>
                    <XCircle size={12} />
                    Inactive
                  </>
                )}
              </button>
            </div>

            {/* Description */}
            <p className="!text-[14px] !text-slate-600 !mb-5 !leading-relaxed !line-clamp-2 !m-0">
              {template.description}
            </p>

            {/* Requirements */}
            <div className="!flex-grow !mb-5">
              <span className="!text-[#ff4d4f] !font-bold !text-[11px] !uppercase !tracking-[0.1em] !block !mb-1.5">
                Requirements
              </span>
              <p className="text-sm text-gray-600 mt-1">{template.requirements}</p>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Calendar size={14} />
                <span>Updated {template.lastUpdated}</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleOpenModal(template)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDeleteTemplate(template.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create/Edit Template Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTemplate ? 'Edit Template' : 'Create New Template'}
        size="lg"
      >
        <div className="!p-6 !space-y-5">
          <div className="!grid !grid-cols-2 !gap-6">
            <div>
              
              <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">
                Template Name
              </label>
             
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="!w-full !px-4 !py-2.5 !border !border-slate-300 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500/50 focus:!border-blue-500 !text-[14px] !text-slate-800 !bg-white"
                placeholder="e.g., Senior Frontend Developer"
              />
            </div>

            <div>
              <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">
                Department
              </label>
              <input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="!w-full !px-4 !py-2.5 !border !border-slate-300 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500/50 focus:!border-blue-500 !text-[14px] !text-slate-800 !bg-white"
                placeholder="e.g., Engineering"
              />
            </div>
          </div>

          <div>
            <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="!w-full !px-4 !py-3 !border !border-slate-300 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500/50 focus:!border-blue-500 !text-[14px] !text-slate-800 !bg-white !min-h-[140px] !resize-y"
              placeholder="Enter job description..."
            />
            <p className="!text-[12px] !text-slate-500 !mt-2">
              Rich text editor would be integrated here in production
            </p>
          </div>

          <div>
            <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">
              Requirements
            </label>
            <textarea
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              className="!w-full !px-4 !py-3 !border !border-slate-300 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500/50 focus:!border-blue-500 !text-[14px] !text-slate-800 !bg-white !min-h-[100px] !resize-y"
              placeholder="List key requirements..."
            />
          </div>

          
          <div className="!flex !justify-end !gap-3 !pt-5 !border-t !border-slate-100 !mt-6">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="!shrink-0 !px-5 !py-2.5">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveTemplate} className="!shrink-0 !px-5 !py-2.5">
              {editingTemplate ? 'Update Template' : 'Create Template'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );


}
