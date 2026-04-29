import Modal from '../../components/Modal.jsx';
import Button from '../../components/Button.jsx';

export default function EmailModal({ isOpen, onClose, editingTemplate, formData, setFormData, onSave }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={editingTemplate ? 'Edit Email Template' : 'Create Email Template'} size="lg">
      <div className="!p-6 !space-y-6">
        <div>
          <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">Email Type</label>
          <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-lg focus:!ring-2 focus:!ring-blue-500">
            <option value="Offer">Offer</option><option value="Reject">Reject</option><option value="Interview">Interview</option>
          </select>
        </div>
        <div>
          <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">Template Name</label>
          <input type="text" value={formData.templateName} onChange={(e) => setFormData({ ...formData, templateName: e.target.value })} className="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-lg" placeholder="Eg: OFFER_TEMPLATE" />
        </div>
        <div>
          <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">Subject Line</label>
          <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })} className="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-lg" placeholder="Use variables like {{applicant_name}}" />
        </div>
        <div>
          <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">Email Body</label>
          <textarea value={formData.body} onChange={(e) => setFormData({ ...formData, body: e.target.value })} className="!w-full !px-4 !py-2 !border !border-gray-300 !rounded-lg !min-h-[250px] !font-mono !text-sm" />
          <p className="text-xs text-gray-500 mt-2">Available: applicant_name, company_name, job_title, start_date, etc.</p>
        </div>
        <div className="!flex !justify-end !gap-3 !pt-5 !border-t !border-slate-100">
          <Button variant="secondary" onClick={onClose} className="!px-5">Cancel</Button>
          <Button variant="primary" onClick={onSave} className="!px-5">{editingTemplate ? 'Update' : 'Create'}</Button>
        </div>
      </div>
    </Modal>
  );
}