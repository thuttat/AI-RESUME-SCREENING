import Modal from '../components/Modal';
import Button from '../components/Button';
import { useState, useEffect } from 'react'; 

export default function UserModal({ isOpen, onClose, editingUser, formData, setFormData, onSave }) {
  const [preview, setPreview] = useState(formData.avatar || '');
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFormData({ ...formData, avatarFile: file });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editingUser ? 'Edit User' : 'Create New User'}
      size="md"
    >
      <div className="!p-6 !space-y-5">

        <div>
          <label className="!block !text-sm !font-bold !text-gray-700 !mb-1.5">
            Full Name
          </label>
          <input
            type="text"
            value={formData.fullname || ''}
            onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
            className="!w-full !px-4 !py-2.5 !border !border-gray-300 !rounded-lg focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !transition-all"
            placeholder="Enter full name"
          />
        </div>

        <div>
          <label className="!block !text-sm !font-bold !text-gray-700 !mb-1.5">
            Username
          </label>
          <input
            type="text"
            value={formData.username || ''}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            className="!w-full !px-4 !py-2.5 !border !border-gray-300 !rounded-lg focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !transition-all"
            placeholder="Enter username (e.g. jdoe)"
            disabled={editingUser}
          />
        </div>

        <div>
          <label className="!block !text-sm !font-bold !text-gray-700 !mb-1.5">
            Email Address
          </label>
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="!w-full !px-4 !py-2.5 !border !border-gray-300 !rounded-lg focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !transition-all"
            placeholder="admin@duckie.com"
          />
        </div>


        <div>
          <label className="!block !text-sm !font-bold !text-gray-700 !mb-1.5">
            Password {editingUser && <span className="!font-normal !text-gray-400">(leave blank to keep current)</span>}
          </label>
          <input
            type="password"
            value={formData.password || ''}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            className="!w-full !px-4 !py-2.5 !border !border-gray-300 !rounded-lg focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !transition-all"
            placeholder="••••••••"
          />
        </div>


        <div>
          <label className="!block !text-sm !font-bold !text-gray-700 !mb-1.5">Avatar</label>
          <div className="!flex !items-center !gap-4">
            <img
              src={preview || 'https://via.placeholder.com/150'}
              className="!w-16 !h-16 !rounded-full !object-cover !border !border-gray-200"
              alt="Preview"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="!block !w-full !text-sm !text-gray-500
                          file:!mr-4 file:!py-2 file:!px-4
                          file:!rounded-full file:!border-0
                          file:!text-sm file:!font-semibold
                          file:!bg-blue-50 file:!text-blue-700
                          hover:file:!bg-blue-100"/>
          </div>
        </div>

        <div>
          <label className="!block !text-sm !font-bold !text-gray-700 !mb-1.5">
            Role
          </label>
          <select
            value={formData.role || 'RECRUITER'}
            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            className="!w-full !px-4 !py-2.5 !border !border-gray-300 !rounded-lg !bg-white focus:!outline-none focus:!ring-2 focus:!ring-blue-500 !transition-all"
          >
            <option value="ADMIN">Admin</option>
            <option value="RECRUITER">Recruiter</option>
            <option value="HIRING_MANAGER">Hiring Manager</option>
          </select>
        </div>


        <div className="!flex !justify-end !gap-3 !pt-6 !mt-2 !border-t !border-gray-100">
          <Button variant="secondary" onClick={onClose} className="!px-6">
            Cancel
          </Button>
          <Button variant="primary" onClick={onSave} className="!px-6">
            {editingUser ? 'Update User' : 'Create User'}
          </Button>
        </div>
      </div>
    </Modal>
  );
}