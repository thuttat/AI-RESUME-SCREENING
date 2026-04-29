import Modal from '../../components/Modal.jsx';

export default function EmailPreviewModal({ isOpen, onClose, previewTemplate }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Email Preview" size="lg">
      <div className="!p-6">
        <div className="!bg-white !border !border-slate-200 !rounded-2xl !overflow-hidden !shadow-sm">
          <div className="!bg-slate-50/80 !px-6 !py-5 !border-b !border-slate-200">
            <div className="!text-[13px] !text-slate-500 !mb-1.5 !font-medium">Subject:</div>
            <div className="!font-bold !text-slate-800 !text-[16px]">{previewTemplate?.subjectPreview}</div>
          </div>
          <div className="!px-6 !py-6">
            <pre className="!whitespace-pre-wrap !font-sans !text-[15px] !text-slate-700 !leading-loose !m-0">
              {previewTemplate?.bodyPreview}
            </pre>
          </div>
        </div>
      </div>
    </Modal>
  );
}