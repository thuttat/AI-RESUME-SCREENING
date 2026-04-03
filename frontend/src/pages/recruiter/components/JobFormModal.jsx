import React, {useEffect, useState} from 'react';
import { Modal } from '../../../components/common/Modal';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';

const JobFormModal = ({ isOpen, onClose, onSubmit, mode = 'create', initialData = null }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        skills: '',
    });

    useEffect(() => {
        if (initialData && (mode === 'edit' || mode === 'view')) {
            setFormData({
                title: initialData?.title || '',
                description: initialData?.description || '',
                skills: initialData?.requiredSkills || ''
            });
        } else {
            setFormData({title: '', description: '', skills: ''});
        }
    }, [initialData, mode]);

    const handleCloseModal = () => {
        setFormData({ title: '', description: '', skills: '' });
        onClose();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title || formData.title.trim().length < 5) {
            return alert('Title must have at least 5 characters');
        }

        onSubmit(formData);
        handleCloseModal();
    };

    const isViewMode = mode === 'view';
    const modalTitle = mode === 'view' ? 'Job Details'
            : mode === 'edit' ? 'Edit Job'
            : 'Create Job';

    return (
        <Modal
            isOpen={isOpen}
            onClose={handleCloseModal}
            title={modalTitle}
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        {isViewMode ? 'Close' : 'Cancel'}
                    </Button>

                    {!isViewMode && (
                        <Button variant="primary" onClick={handleSubmit}>
                            {mode === 'edit' ? 'Save Changes' : 'Create'}
                        </Button>
                    )}
                </>
            }
        >
            <div className="form-container">
                <Input
                    label="Job Title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    disabled={isViewMode}
                />

                <div style={{ marginBottom: '15px' }}>
                    <label className="label" style={{ display: 'block', marginBottom: '5px', fontSize: '14px', fontWeight: '500' }}>
                        Description
                    </label>
                    <textarea
                        className="textarea"
                        rows={4}
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        disabled={isViewMode}
                    />
                </div>

                <Input
                    label="Skills"
                    placeholder="React, Node.js..."
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    disabled={isViewMode}
                />
            </div>
        </Modal>
    );
};

export default JobFormModal;