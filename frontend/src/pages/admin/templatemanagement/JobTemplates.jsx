import { useState, useEffect } from 'react';
import axios from 'axios';
import JobHeader from './job-templates/JobHeader.jsx';
import JobGrid from './job-templates/JobGrid.jsx';
import JobModal from './job-templates/JobModal.jsx';

export default function JobTemplates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    requirements: ''
  });
  const [templates, setTemplates] = useState([]);

  const fetchTemplates = async () => {
    setIsLoading(true); 
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error("No access token found");
        setIsLoading(false);
        return;
      }
      const response = await axios.get('http://localhost:8080/api/job-templates', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data && response.data.content) {
        setTemplates(response.data.content);
      } else {
        setTemplates([]);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchTemplates();
  }, []);


  const handleOpenModal = (template = null) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({
        title: template.title,
        department: template.department,
        description: template.description,
        requirements: template.requirements
      });
    } else {
      setEditingTemplate(null);
      setFormData({ title: '', department: '', description: '', requirements: '' });
    }
    setIsModalOpen(true);
  };

  const handleSaveTemplate = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (editingTemplate) {
        await axios.put(`http://localhost:8080/api/job-templates/${editingTemplate.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:8080/api/job-templates', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      await fetchTemplates();
      setIsModalOpen(false);
    } catch (error) {
      alert("Error saving template!");
    }
  };


  const handleToggleActive = async (id) => {
    try {
      const token = localStorage.getItem('accessToken');
      const target = templates.find(t => t.id === id);
      if (!target) return;
      await axios.patch(`http://localhost:8080/api/job-templates/${id}`,
        { isActive: !target.isActive },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchTemplates();
    } catch (error) {
      alert("Error updating status!");
    }
  };


  const handleDeleteTemplate = async (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`http://localhost:8080/api/job-templates/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        await fetchTemplates();
      } catch (error) {
        alert("Error deleting template!");
      }
    }
  };


  return (
    <div className="flex flex-col gap-6">
      <JobHeader onAddNew={() => handleOpenModal()} />

      {templates.length === 0 ? (
        <div className="text-center p-10 text-gray-400">Don't have any job templates yet.</div>
      ) : (
        <JobGrid
          templates={templates}
          onEdit={handleOpenModal}
          onDelete={handleDeleteTemplate}
          onToggleActive={handleToggleActive}
        />
      )}

      <JobModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        editingTemplate={editingTemplate}
        formData={formData}
        setFormData={setFormData}
        onSave={handleSaveTemplate}
      />
    </div>
  );
}
