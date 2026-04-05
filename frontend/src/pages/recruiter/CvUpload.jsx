import React, { useState, useRef } from "react";
import api from "../../services/api";
import { Card } from "../../components/common/Card";
import { Button } from "../../components/common/Button";
import { UploadCloud, FileText, X, CheckCircle, AlertCircle } from "lucide-react";

export default function CvUpload() {
    const [files, setFiles] = useState([]);
    const [jobId, setJobId] = useState("1"); 
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState(null); 
    const fileInputRef = useRef(null);

    const handleFileSelect = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const validFiles = selectedFiles.filter(f => 
            f.type === "application/pdf" || 
            f.name.endsWith(".docx") || 
            f.name.endsWith(".doc") ||
            f.name.endsWith(".pdf")
        );
        
        setFiles(prev => [...prev, ...validFiles]);
        setUploadStatus(null);
    };

    const removeFile = (indexToRemove) => {
        setFiles(files.filter((_, index) => index !== indexToRemove));
    };

    const handleUpload = async () => {
        if (files.length === 0) return;

        try {
            setIsUploading(true);
            setUploadStatus(null);

            const formData = new FormData();
            files.forEach(file => {
                formData.append("files", file);
            });
            formData.append("jobId", jobId);

            await api.post("/recruiter/upload", formData);

            setUploadStatus("success");
            setFiles([]); 
            if (fileInputRef.current) fileInputRef.current.value = ""; 

        } catch (error) {
            console.error("Upload error:", error);
            setUploadStatus("error");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="p-6 max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Tải Hồ Sơ Ứng Viên</h1>
                <p className="text-gray-500 text-sm mt-1">Hệ thống sẽ tự động đọc (Parse CV) và phân tích các kỹ năng ngay sau khi tải lên.</p>
            </div>

            <Card className="p-8 border-none shadow-sm bg-white">
                {/* Khu vực chọn Job */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Chọn vị trí tuyển dụng
                    </label>
                    <select 
                        className="w-full md:w-1/2 p-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
                        value={jobId}
                        onChange={(e) => setJobId(e.target.value)}
                    >
                        <option value="1">Senior Java Spring Boot Developer</option>
                        <option value="2">Frontend ReactJS Engineer</option>
                    </select>
                </div>

                {/* Khu vực Upload (Kéo thả) */}
                <div 
                    className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors
                        ${files.length > 0 ? 'border-blue-400 bg-blue-50/50' : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'}`}
                >
                    <UploadCloud className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Kéo thả CV vào đây</h3>
                    <p className="text-sm text-gray-500 mt-1 mb-4">Hoặc click để chọn file từ máy tính (PDF, DOCX)</p>
                    
                    <input 
                        type="file" 
                        multiple 
                        accept=".pdf,.doc,.docx"
                        className="hidden" 
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                    />
                    
                    <Button 
                        variant="outline" 
                        onClick={() => fileInputRef.current?.click()}
                    >
                        Chọn File
                    </Button>
                </div>

                {/* Danh sách file đã chọn */}
                {files.length > 0 && (
                    <div className="mt-8">
                        <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center justify-between">
                            <span>Đã chọn {files.length} file</span>
                            <button onClick={() => setFiles([])} className="text-red-500 hover:underline text-xs">Xóa tất cả</button>
                        </h4>
                        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                            {files.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <FileText className="text-blue-500 flex-shrink-0" size={20} />
                                        <span className="text-sm text-gray-700 truncate">{file.name}</span>
                                        <span className="text-xs text-gray-400 flex-shrink-0">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </span>
                                    </div>
                                    <button 
                                        onClick={() => removeFile(index)}
                                        className="text-gray-400 hover:text-red-500 p-1"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Status Message */}
                {uploadStatus === 'success' && (
                    <div className="mt-6 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                        <CheckCircle size={20} />
                        <span>Tải lên và xử lý CV thành công! Bạn có thể xem kết quả ở tab Xếp Hạng.</span>
                    </div>
                )}
                
                {uploadStatus === 'error' && (
                    <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg flex items-center gap-2">
                        <AlertCircle size={20} />
                        <span>Có lỗi xảy ra khi tải lên. Vui lòng thử lại.</span>
                    </div>
                )}

                {/* Submit Button */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end">
                    <Button 
                        variant="primary" 
                        size="md" 
                        onClick={handleUpload}
                        disabled={files.length === 0 || isUploading}
                        className={isUploading ? 'opacity-70 cursor-not-allowed' : ''}
                    >
                        {isUploading ? 'Đang xử lý AI...' : 'Tải lên hệ thống'}
                    </Button>
                </div>
            </Card>
        </div>
    );
}