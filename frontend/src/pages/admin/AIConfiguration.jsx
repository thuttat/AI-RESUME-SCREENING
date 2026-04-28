import { useState, useEffect } from 'react';
import api from "../../api/AxiosClient.js";
import { Play } from 'lucide-react';
import Button from './components/Button.jsx';
import ConfigSettingsCard from './aiconfiguration/ConfigSettingsCard.jsx';
import FileUploadZone from './aiconfiguration/FileUploadZone.jsx';
import TestResultsDisplay from './aiconfiguration/TestResultsDisplay.jsx';

export default function AIConfiguration() {
  const [config, setConfig] = useState({ provider: 'gpt-4o-mini', apiKey: '' });
  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);


  useEffect(() => {
    const fetchAIConfig = async () => {
      try {
        const response = await api.get('/ai-config');
        if (response.data && response.data.length > 0) {
          setConfig(response.data[0]);
        }
      } catch (error) {
        console.error("Error fetching AI config:", error);
      }
    };
    fetchAIConfig();
  }, []);

  const handleSaveConfig = async () => {
    if (!config.apiKey || config.apiKey.trim() === '') {
      alert('Please enter your API Key before saving!');
      return; 
    }
    setIsLoading(true);
    try {
      // await api.put('/ai-config', { 
      //     configKey: 'MODEL', 
      //     configValue: config.provider 
      // });

      await api.put('/ai-config', { 
          configKey: 'API_KEY', 
          configValue: config.apiKey 
      });
      
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
      alert('AI Configuration saved successfully!');
    } catch (error) {
      console.error("Save error:", error);
      alert('Failed to save configuration. Please check your API Key.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileUpload = (file) => {
    if (file && (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')) {
      setUploadedFile(file);
    } else {
      alert('Please upload a PDF or DOCX file');
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleRunTest = async () => {
    if (!uploadedFile) {
      alert('Please upload a CV file first');
      return;
    }

    setIsLoading(true);
    setTestResult(null);
    const formData = new FormData();
    formData.append('file', uploadedFile);

    try {
     const response = await api.post('/ai-config/test', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setTestResult({
        status: 'success',
        data: response.data
      });
    } catch (error) {
      console.error("AI Test error:", error);
      alert('AI processing failed. Please check your AI settings and API Key.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="!flex !flex-col !gap-6 !p-8 !w-full !bg-[#f8f9fa] !min-h-screen !overflow-y-auto">
      <h1 className="!text-2xl !font-bold !text-slate-800 !m-0">AI Configuration</h1>

      <ConfigSettingsCard
        config={config}
        setConfig={setConfig}
        onSave={handleSaveConfig}
        isLoading={isLoading}
        isSaved={isSaved}
      />

      <div className="!bg-white !border !border-slate-200 !rounded-2xl !p-7 !shadow-sm">
        <h2 className="!text-slate-800 !font-bold !text-lg !tracking-wide !mb-5 !m-0">
          AI Testing Sandbox
        </h2>
        <div className="!space-y-6">
          <FileUploadZone
            onFileUpload={handleFileUpload}
            uploadedFile={uploadedFile}
            isDragging={isDragging}
            onDrop={handleDrop}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
          />

          <Button
            variant="primary"
            icon={Play}
            onClick={handleRunTest}
            className="!bg-blue-600 hover:!bg-blue-700 !px-6 !py-2.5 !shrink-0"
          >
            {isLoading ? 'Running AI Test...' : 'Run AI Test'}
          </Button>

          {isLoading && (
            <div className="!flex !items-center !justify-center !p-10">
              <div className="!animate-spin !rounded-full !h-10 !w-10 !border-b-2 !border-blue-600"></div>
            </div>
          )}

          <TestResultsDisplay testResult={testResult} />
        </div>
      </div>
    </div>
  );
}