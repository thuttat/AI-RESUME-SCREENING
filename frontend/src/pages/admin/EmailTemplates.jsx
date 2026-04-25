import { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, Mail } from 'lucide-react';
import Button from './components/Button.jsx';
import Modal from './components/Modal.jsx';
import { clsx } from 'clsx';

export default function EmailTemplates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [templates, setTemplates] = useState([
    {
      id: 1,
      type: 'Offer',
      subject: 'Congratulations! Job Offer from {{company_name}}',
      body: 'Dear {{applicant_name}},\n\nWe are pleased to offer you the position of {{job_title}} at {{company_name}}.\n\nYour starting salary will be {{salary}} and your start date is {{start_date}}.\n\nPlease confirm your acceptance by {{deadline}}.\n\nBest regards,\n{{recruiter_name}}'
    },
    {
      id: 2,
      type: 'Reject',
      subject: 'Application Status Update - {{job_title}}',
      body: 'Dear {{applicant_name}},\n\nThank you for your interest in the {{job_title}} position at {{company_name}}.\n\nAfter careful consideration, we have decided to move forward with other candidates whose qualifications more closely match our current needs.\n\nWe appreciate the time you took to apply and wish you the best in your job search.\n\nSincerely,\n{{recruiter_name}}'
    },
    {
      id: 3,
      type: 'Interview',
      subject: 'Interview Invitation - {{job_title}} at {{company_name}}',
      body: 'Dear {{applicant_name}},\n\nWe were impressed with your application for the {{job_title}} position.\n\nWe would like to invite you for an interview on {{interview_date}} at {{interview_time}}.\n\nThe interview will be held at {{location}} with {{interviewer_name}}.\n\nPlease confirm your availability.\n\nBest regards,\n{{recruiter_name}}'
    }
  ]);

  const [formData, setFormData] = useState({
    type: 'Offer',
    subject: '',
    body: ''
  });

  const handleOpenModal = (template = null) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({
        type: template.type,
        subject: template.subject,
        body: template.body
      });
    } else {
      setEditingTemplate(null);
      setFormData({
        type: 'Offer',
        subject: '',
        body: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveTemplate = () => {
    if (editingTemplate) {
      setTemplates(
        templates.map((t) => (t.id === editingTemplate.id ? { ...t, ...formData } : t))
      );
    } else {
      const newTemplate = {
        id: templates.length + 1,
        ...formData
      };
      setTemplates([...templates, newTemplate]);
    }
    setIsModalOpen(false);
  };

  const handleDeleteTemplate = (id) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setTemplates(templates.filter((t) => t.id !== id));
    }
  };

  const handlePreview = (template) => {
    // Mock applicant data for preview
    const mockData = {
      applicant_name: 'Nguyễn Văn An',
      company_name: 'HappyFood Tech Co.',
      job_title: 'Senior Frontend Developer',
      salary: '2,500 USD',
      start_date: 'May 1, 2026',
      deadline: 'April 20, 2026',
      recruiter_name: 'Trần Thị Bình',
      interview_date: 'April 18, 2026',
      interview_time: '10:00 AM',
      location: 'HappyFood Headquarters, Hanoi',
      interviewer_name: 'Lê Minh Cường'
    };

    const previewSubject = template.subject.replace(
      /\{\{(\w+)\}\}/g,
      (match, key) => mockData[key] || match
    );
    const previewBody = template.body.replace(
      /\{\{(\w+)\}\}/g,
      (match, key) => mockData[key] || match
    );

    setPreviewTemplate({
      ...template,
      subject: previewSubject,
      body: previewBody
    });
    setIsPreviewOpen(true);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'Offer':
        return 'bg-green-100 text-green-700';
      case 'Reject':
        return 'bg-red-100 text-red-700';
      case 'Interview':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="flex flex-col gap-6 p-8 w-full bg-[#f8f9fa] min-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Email Templates</h1>
        <Button variant="primary" icon={Plus} onClick={() => handleOpenModal()} className="!shrink-0 !px-5 !py-2.5">
          Create Template
        </Button>
      </div>

      {/* Templates Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
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
              <tr
                key={template.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="!px-4 !py-4 text-sm text-gray-700">{template.id}</td>
                <td className="!px-4 !py-4">
                  <span
                    className={clsx(
                      '!inline-flex !items-center !justify-center !w-fit !h-auto gap-1.5 !px-3 !py-1 text-xs font-semibold rounded-full transition-colors',
                      getTypeColor(template.type)
                    )}
                  >
                    <Mail size={12} />
                    {template.type}
                  </span>
                </td>
                <td className="px-4 py-4 text-sm text-gray-900">{template.subject}</td>
                <td className="px-4 py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handlePreview(template)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                      title="Preview"
                    >
                      <Eye size={16} />
                    </button>
                    <button
                      onClick={() => handleOpenModal(template)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteTemplate(template.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Template Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTemplate ? 'Edit Email Template' : 'Create Email Template'}
        size="lg"
      >
        <div className="!p-6 !space-y-6">
          <div>
            <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">
              Email Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-lg !focus:outline-none !focus:ring-2 !focus:ring-blue-500"
            >
              <option value="Offer">Offer</option>
              <option value="Reject">Reject</option>
              <option value="Interview">Interview</option>
            </select>
          </div>

          <div>
            <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">
              Subject Line
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Use variables like {{applicant_name}}, {{job_title}}, {{company_name}}"
            />
          </div>

          <div>
           <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">
              Email Body
            </label>
            <textarea
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[300px] font-mono text-sm"
              placeholder="Use variables like {{applicant_name}}, {{recruiter_name}}, etc."
            />
            <p className="text-xs text-gray-500 mt-2">
              Available variables: applicant_name, company_name, job_title, salary, start_date,
              deadline, recruiter_name, interview_date, interview_time, location, interviewer_name
            </p>
          </div>

          <div className="!flex !justify-end !gap-3 !pt-5 !border-t !border-slate-100 !mt-2">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)} className="!shrink-0 !px-5 !py-2.5">
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveTemplate} className="!shrink-0 !px-5 !py-2.5">
              {editingTemplate ? 'Update Template' : 'Create Template'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Preview Modal */}
      <Modal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Email Preview"
        size="lg"
      >
        <div className="!p-6">
          <div className="!bg-white !border !border-slate-200 !rounded-2xl !overflow-hidden !shadow-sm">
            {/* Email Header */}
            <div className="!bg-slate-50/80 !px-6 !py-5 !border-b !border-slate-200">
              <div className="!text-[13px] !text-slate-500 !mb-1.5 !font-medium">Subject:</div>
              <div className="!font-bold !text-slate-800 !text-[16px]">{previewTemplate?.subject}</div>
            </div>

            {/* Email Body */}
            <div className="!px-6 !py-6">
              <div className="!prose !max-w-none">
                <pre className="!whitespace-pre-wrap !font-sans !text-[15px] !text-slate-700 !leading-loose !m-0">
                  {previewTemplate?.body}
                </pre>
              </div>
            </div>

            {/* Mock Data Info */}
            <div className="!bg-[#f0f7ff] !px-6 !py-4 !border-t !border-blue-100">
              <p className="!text-[13px] !text-blue-700 !m-0 !leading-relaxed">
                <strong className="!font-bold !mr-1">Note:</strong> This preview uses mock applicant data. In production, actual
                applicant data will be used to fill the template variables.
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
