import { useState } from 'react';
import { Download, UserPlus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import Button from './components/Button';
import Modal from './components/Modal';
import { clsx } from 'clsx';

export default function UsersManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: 'Nguyễn Văn An',
      email: 'nguyenvanan@company.com',
      role: 'Admin',
      status: 'active',
      avatar: 'https://ui-avatars.com/api/?name=Nguyen+Van+An&background=20222a&color=fff'
    },
    {
      id: 2,
      name: 'Trần Thị Bình',
      email: 'tranthibinh@company.com',
      role: 'Recruiter',
      status: 'active',
      avatar: 'https://ui-avatars.com/api/?name=Tran+Thi+Binh&background=ff4d4f&color=fff'
    },
    {
      id: 3,
      name: 'Lê Minh Cường',
      email: 'leminhcuong@company.com',
      role: 'Hiring Manager',
      status: 'inactive',
      avatar: 'https://ui-avatars.com/api/?name=Le+Minh+Cuong&background=3b82f6&color=fff'
    },
    {
      id: 4,
      name: 'Phạm Thu Dung',
      email: 'phamthudung@company.com',
      role: 'Recruiter',
      status: 'active',
      avatar: 'https://ui-avatars.com/api/?name=Pham+Thu+Dung&background=10b981&color=fff'
    }
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Recruiter'
  });

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        password: '',
        role: 'Recruiter'
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      setUsers(
        users.map((u) =>
          u.id === editingUser.id
            ? { ...u, name: formData.name, email: formData.email, role: formData.role }
            : u
        )
      );
    } else {
      const newUser = {
        id: users.length + 1,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        status: 'active',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(
          formData.name
        )}&background=20222a&color=fff`
      };
      setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
  };

  const handleToggleStatus = (id) => {
    setUsers(
      users.map((u) =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
      )
    );
  };

  const handleDeleteUser = (id) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleExportCSV = () => {
    alert('Exporting users to CSV...');
  };

  return (
    <div className="flex flex-col gap-6 p-8 w-full bg-[#f8f9fa] min-h-screen overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Users Management</h1>
        <div className="flex gap-3">
          <Button variant="secondary" icon={Download} onClick={handleExportCSV} className="!shrink-0 !px-5 !py-2.5">
            Export CSV
          </Button>
         
          <Button variant="primary" icon={UserPlus} onClick={() => handleOpenModal()} className="!shrink-0 !px-5 !py-2.5">
            Add New User
          </Button>
        </div>  
      </div>

      {/* Users Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50/50 text-left">
              <th className="!px-4 !py-3 text-sm font-semibold text-gray-700">ID</th>
              <th className="!px-4 !py-3 text-sm font-semibold text-gray-700">Avatar</th>
              <th className="!px-4 !py-3 text-sm font-semibold text-gray-700">Full Name</th>
              <th className="!px-4 !py-3 text-sm font-semibold text-gray-700">Email</th>
              <th className="!px-4 !py-3 text-sm font-semibold text-gray-700">Role</th>
              <th className="!px-4 !py-3 text-sm font-semibold text-gray-700">Status</th>
              <th className="!px-4 !py-3 text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="!px-4 !py-4 text-sm text-gray-700">{user.id}</td>
                <td className="!px-4 !py-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="!px-4 !py-4 text-sm font-medium text-gray-900">{user.name}</td>
                <td className="!px-4 !py-4 text-sm text-gray-600">{user.email}</td>
                <td className="!px-4 !py-4">
                  <span
                    className={clsx(
                      '!inline-flex !items-center !justify-center !px-4 !py-1.5 !w-fit !h-auto text-xs font-semibold rounded-full',
                      user.role === 'Admin' && 'bg-[#20222a] text-white',
                      user.role === 'Recruiter' && 'bg-blue-100 text-blue-700',
                      user.role === 'Hiring Manager' && 'bg-purple-100 text-purple-700'
                    )}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="!px-4 !py-4">
                  <button
                    onClick={() => handleToggleStatus(user.id)}
                    className={clsx(
                      '!inline-flex !items-center !justify-center !px-4 !py-1.5 !w-fit !h-auto text-xs font-semibold rounded-full',
                      user.status === 'active'
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    )}
                  >
                    {user.status === 'active' ? (
                      <>
                        <Eye size={12} />
                        Active
                      </>
                    ) : (
                      <>
                        <EyeOff size={12} />
                        Inactive
                      </>
                    )}
                  </button>
                </td>
                <td className="!px-4 !py-4">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenModal(user)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit2 size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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

      {/* Create/Edit User Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingUser ? 'Edit User' : 'Create New User'}
        size="md"
      >
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter full name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email address"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password {editingUser && '(leave blank to keep current)'}
            </label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Role</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Admin">Admin</option>
              <option value="Recruiter">Recruiter</option>
              <option value="Hiring Manager">Hiring Manager</option>
            </select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSaveUser}>
              {editingUser ? 'Update User' : 'Create User'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
