import Modal from '../../components/Modal.jsx';
import Button from '../../components/Button.jsx';

export default function JobModal({ isOpen, onClose, editingTemplate, formData, setFormData, onSave }) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingTemplate ? "Edit Job Template" : "Create Job Template"}
      size="lg"
    >
      <div className="!p-6 !space-y-5">
        <div className="!grid !grid-cols-2 !gap-6">
          <div>
            <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">Template Name</label>
            <input type="text" value={formData.title || ''} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="!w-full !px-4 !py-2.5 !border !border-slate-300 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500/50 !text-[14px]" placeholder="e.g., Senior Frontend Developer" />
          </div>
          <div>
            <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">Department</label>
            <input type="text" value={formData.department || ''} onChange={(e) => setFormData({ ...formData, department: e.target.value })} className="!w-full !px-4 !py-2.5 !border !border-slate-300 !rounded-xl focus:!outline-none focus:!ring-2 focus:!ring-blue-500/50 !text-[14px]" placeholder="e.g., Engineering" />
          </div>
        </div>
        <div>
          <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">Description</label>
          <textarea value={formData.description || ''} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="!w-full !px-4 !py-3 !border !border-slate-300 !rounded-xl !min-h-[140px]" placeholder="Enter job description..." />
        </div>
        <div>
          <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">Requirements</label>
          <textarea value={formData.requirements || ''} onChange={(e) => setFormData({ ...formData, requirements: e.target.value })} className="!w-full !px-4 !py-3 !border !border-slate-300 !rounded-xl !min-h-[100px]" placeholder="List key requirements..." />
        </div>
        <div className="!flex !justify-end !gap-3 !pt-5 !border-t !border-slate-100">
          <Button variant="secondary" onClick={onClose} className="!px-5 !py-2.5">Cancel</Button>
          <Button variant="primary" onClick={onSave} className="!px-5 !py-2.5">{editingTemplate ? 'Update Template' : 'Create Template'}</Button>
        </div>
      </div>
    </Modal>
  );
}