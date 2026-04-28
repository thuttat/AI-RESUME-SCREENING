import { Upload, Check } from 'lucide-react';
import { clsx } from 'clsx';

export default function FileUploadZone({ onFileUpload, uploadedFile, isDragging, onDrop, onDragOver, onDragLeave }) {
  return (
    <div>
      <label className="!block !text-[13px] !font-bold !text-slate-700 !mb-2">
        Upload Sample CV
      </label>
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        className={clsx(
          '!border-2 !border-dashed !rounded-2xl !p-10 !text-center !transition-colors !flex !flex-col !items-center !justify-center',
          isDragging
            ? '!border-blue-500 !bg-blue-50/50'
            : '!border-slate-300 hover:!border-slate-400'
        )}
      >
        <input
          type="file"
          id="cv-upload"
          className="!hidden"
          accept=".pdf,.docx"
          onChange={(e) => onFileUpload(e.target.files[0])}
        />
        <label
          htmlFor="cv-upload"
          className="!cursor-pointer !flex !flex-col !items-center !gap-4 !w-full"
        >
          <div className="!w-16 !h-16 !bg-slate-100 !rounded-full !flex !items-center !justify-center !shrink-0">
            <Upload size={28} className="!text-slate-500" />
          </div>
          <div>
            <p className="!font-bold !text-[15px] !text-slate-700 !m-0">
              Drop your CV here or click to browse
            </p>
            <p className="!text-[13px] !text-slate-500 !mt-1.5 !m-0">
              Supports PDF and DOCX files
            </p>
          </div>
        </label>
      </div>

      {uploadedFile && (
        <div className="!mt-4 !flex !items-center !gap-2.5 !p-3.5 !bg-green-50 !border !border-green-200 !rounded-xl">
          <Check size={18} className="!text-green-600 !shrink-0" />
          <span className="!text-[14px] !text-green-700 !font-semibold">
            {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(2)} KB)
          </span>
        </div>
      )}
    </div>
  );
}