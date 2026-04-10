import React from 'react';
import {Button} from "../../../../components/common/Button.jsx";

const UploadPanel = ({
                         selectedFiles,
                         setSelectedFiles,
                         jobId,
                         setJobId,
                         jobs,
                         onUpload,
                         fileInputRef,
                         isUploading
                     }) => {

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files).filter(f => f.type === 'application/pdf');
        setSelectedFiles(prev => [...prev, ...files]);
    };

    const removeSelectedFiles = (indexRemove) => {
        setSelectedFiles(files => files.filter((_, index) => index !== indexRemove));
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const clearAllFiles = () => {
        setSelectedFiles([]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    }

    return (
        <section className="control-panel">
            <div className="config-group">
                <div>
                    <h3>Job position</h3>
                    <p className="page-subtitle">Choose a job position before uploading</p>
                </div>

                <select
                    className="job-select"
                    value={jobId}
                    onChange={(e) => setJobId(Number(e.target.value))}
                    disabled={jobs.length === 0}
                >
                    {jobs.length === 0 ? (
                        <option value="">Loading list of jobs...</option>
                    ) : (
                        jobs.map(job => (
                            <option key={job.id} value={job.id}>
                                {job.title}
                            </option>
                        ))
                    )}
                </select>
            </div>

            <div className="panel-header">
                <h3>Add candidate profile</h3>
                <p className="page-subtitle">Supports .pdf format</p>
            </div>

            <div className="upload-zone">
                <input
                    type="file"
                    multiple
                    accept=".pdf"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden-input"
                    id="file-input"
                    disabled={isUploading}
                />

                <label htmlFor="file-input" className="upload-label" style={{
                    cursor: isUploading ? 'not-allowed' : 'pointer',
                    opacity: isUploading ? 0.6 : 1
                }}>
                    <span>
                        {selectedFiles.length > 0
                            ? `${selectedFiles.length} files selected`
                            : 'Drag and drop files here'}
                    </span>
                </label>

                {selectedFiles.length > 0 && (
                    <div className="selected-files-list">
                        {selectedFiles.map((file, index) => (
                            <div key={index} className="selected-file-item">
                                <span className="selected-file-name">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>

                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="btn-remove-file"
                                    onClick={() => removeSelectedFiles(index)}
                                    disabled={isUploading}
                                >X</Button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="upload-actions">
                    {selectedFiles.length > 0 && (
                        <Button
                            variant="outline"
                            onClick={clearAllFiles}
                            disabled={isUploading}
                        >
                            Cancel
                        </Button>
                    )}

                    <Button
                        variant="primary"
                        onClick={onUpload}
                        disabled={selectedFiles.length === 0 || jobs.length === 0 || isUploading}
                    >
                        Upload {selectedFiles.length > 0 ? `(${selectedFiles.length})` : ''}
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default UploadPanel;