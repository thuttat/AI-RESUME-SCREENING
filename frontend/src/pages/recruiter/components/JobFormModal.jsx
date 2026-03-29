import React, { useState } from 'react';
import { Modal } from '../../../components/common/Modal';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';

const JobFormModal = ({ isOpen, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        skills: '',
    });

    const handleSubmit = () => {
        if (!formData.title) return alert('Title is required');

        onSubmit(formData);

        setFormData({
            title: '',
            description: '',
            skills: '',
        });

        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Create Job"
            footer={
                <>
                    <Button variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                        Create
                    </Button>
                </>
            }
        >
            <div className="form-container">
                <Input
                    label="Job Title"
                    value={formData.title}
                    onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                    }
                />

                <div>
                    <label className="label">Description</label>
                    <textarea
                        className="textarea"
                        rows={4}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                    />
                </div>

                <Input
                    label="Skills"
                    placeholder="React, Node.js..."
                    value={formData.skills}
                    onChange={(e) =>
                        setFormData({ ...formData, skills: e.target.value })
                    }
                />
            </div>
        </Modal>
    );
};

export default JobFormModal;