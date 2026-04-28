import { useState, useEffect } from 'react';
import axios from 'axios';
import UsersHeader from './users/UsersHeader';
import UsersTable from './users/UsersTable';
import UserModal from './users/UserModal';

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ fullname: '', email: '', password: '', role: 'RECRUITER', avatar: '' });

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8080/api/users', {
        headers: { Authorization: `Bearer ${token}` },
        params: { size: 100 }
      });
      console.log("Dữ liệu từ BE:", response.data);// debug log
      setUsers(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOpenModal = (user = null) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        password: '',
        role: user.role
      });
    } else {
      setEditingUser(null);
      setFormData({ fullname: '', email: '', username: '', password: '', role: 'RECRUITER', avatar: '' });
    }
    setIsModalOpen(true);
  };

  const handleSaveUser = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      let finalAvatarUrl = formData.avatar;
      if (formData.avatarFile) {
        const uploadData = new FormData();
        uploadData.append('file', formData.avatarFile);
        const uploadRes = await axios.post('http://localhost:8080/api/users/upload-avatar', uploadData, {
          headers: {
            ...config.headers,
            'Content-Type': 'multipart/form-data'
          }
        });
        finalAvatarUrl = uploadRes.data;
      }
      const userToSave = { ...formData, avatar: finalAvatarUrl };
      delete userToSave.avatarFile;
      if (editingUser) {
        await axios.put(`http://localhost:8080/api/users/${editingUser.id}`, userToSave, config);
      } else {
        await axios.post('http://localhost:8080/api/users', userToSave, config);
      }
      fetchUsers();
      setIsModalOpen(false);
    } catch (error) {
      alert("Error saving user!");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`http://localhost:8080/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        alert('User deleted successfully!');
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Cannot delete this user!');
      }
    }
  };

  const handleToggleStatus = async (user) => {
    try {
      const token = localStorage.getItem('accessToken');
      const newStatus = user.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
      await axios.put(`http://localhost:8080/api/users/${user.id}`, {
        ...user,
        status: newStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchUsers();
    } catch (error) {
      alert('Cannot update user status!');
    }
  };

  const handleExport = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8080/api/users/export', {
        headers: { Authorization: `Bearer ${token}` },
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `users_list_${new Date().getTime()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed!');
    }
  };

  if (isLoading) return <div className="p-8">Loading users...</div>;

  return (
    <div className="flex flex-col gap-6 p-8 w-full bg-[#f8f9fa] min-h-screen overflow-y-auto">
      <UsersHeader
        onExport={handleExport}
        onAddNew={() => handleOpenModal()}
      />
      <UsersTable
        users={users}
        onEdit={handleOpenModal}
        onDelete={handleDeleteUser}
        onToggleStatus={handleToggleStatus}
      />

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingUser={editingUser}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveUser}
      />
    </div>
  );
}