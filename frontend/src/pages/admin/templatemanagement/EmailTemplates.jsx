import { useState, useEffect } from 'react';
import axios from 'axios';
import EmailHeader from './email-templates/EmailHeader';
import EmailTable from './email-templates/EmailTable';
import EmailModal from './email-templates/EmailModal';
import EmailPreviewModal from './email-templates/EmailPreviewModal';

export default function EmailTemplates() {
  const [templates, setTemplates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [previewTemplate, setPreviewTemplate] = useState(null);
  const [formData, setFormData] = useState({ templateName: 'Offer', subject: '', body: '' });


  const fetchEmailTemplates = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:8080/api/email-templates', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTemplates(response.data.content || []);
    } catch (error) {
      console.error("Error fetching email templates:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEmailTemplates();
  }, []);

 
  const handleSaveTemplate = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (editingTemplate) {
        await axios.put(`http://localhost:8080/api/email-templates/${editingTemplate.id}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:8080/api/email-templates', formData, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      fetchEmailTemplates();
      setIsModalOpen(false);
    } catch (error) {
      alert("Error saving email template!");
    }
  };

 
  const handlePreview = async (template) => {
    try {
      const token = localStorage.getItem('accessToken');
      const mockData = {
        applicant_name: 'Nguyễn Văn An',
        job_title: 'Senior Frontend Developer',
        company_name: 'Duckie AI Tech'
      };
      const response = await axios.post(`http://localhost:8080/api/email-templates/${template.id}/preview`, mockData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPreviewTemplate(response.data);
      setIsPreviewOpen(true);
    } catch (error) {
      alert("Error generating preview!");
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (window.confirm('Delete this template?')) {
      try {
        const token = localStorage.getItem('accessToken');
        await axios.delete(`http://localhost:8080/api/email-templates/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        fetchEmailTemplates();
      } catch (error) {
        alert("Error deleting template!");
      }
    }
  };

  const handleOpenModal = (template = null) => {
    if (template) {
      setEditingTemplate(template);
      setFormData({ 
        templateName: template.templateName, 
        subject: template.subject, 
        body: template.body 
      });
    } else {
      setEditingTemplate(null);
      setFormData({ templateName: 'Offer', subject: '', body: '' });
    }
    setIsModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <EmailHeader onAddNew={() => handleOpenModal()} />
      
      {isLoading ? (
        <div className="text-center p-10">Loading templates...</div>
      ) : (
        <EmailTable 
          templates={templates} 
          onEdit={handleOpenModal} 
          onDelete={handleDeleteTemplate} 
          onPreview={handlePreview} 
        />
      )}

      <EmailModal 
        isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} 
        editingTemplate={editingTemplate} formData={formData} 
        setFormData={setFormData} onSave={handleSaveTemplate} 
      />

      <EmailPreviewModal 
        isOpen={isPreviewOpen} onClose={() => setIsPreviewOpen(false)} 
        previewTemplate={previewTemplate} 
      />
    </div>
  );
}