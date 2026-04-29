import { useState, useEffect } from 'react';
import JobHeader from './job-templates/JobHeader.jsx';
import JobGrid from './job-templates/JobGrid.jsx';
import JobModal from './job-templates/JobModal.jsx';
import api from "../../../apis/AxiosClient.js";

export default function JobTemplates() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    description: '',
    requirements: '',
    requiredSkills: ''
  });
  const [templates, setTemplates] = useState([]);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const response = await api.get('/job-templates');
      if (Array.isArray(response.data)) {
        setTemplates(response.data);
      } else if (response.data && response.data.content) {
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
        requirements: template.requirements,
        requiredSkills: template.requiredSkills || ''
      });
    } else {
      setEditingTemplate(null);
      setFormData({ title: '', department: '', description: '', requirements: '', requiredSkills: '' });
    }
    setIsModalOpen(true);
  };

  const handleSaveTemplate = async () => {
    try {
      if (editingTemplate) {
        await api.put(`/job-templates/${editingTemplate.id}`, formData);
      } else {
        await api.post('/job-templates', formData);
      }
      await fetchTemplates();
      setIsModalOpen(false);
    } catch (error) {
      alert("Error saving template!");
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const target = templates.find(t => t.id === id);
      if (!target) return;

      await api.patch(`/job-templates/${id}`, { isActive: !target.isActive });
      await fetchTemplates();
    } catch (error) {
      alert("Error updating status!");
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (window.confirm('Are you sure you want to delete this template?')) {
      try {
        await api.delete(`/job-templates/${id}`);
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
