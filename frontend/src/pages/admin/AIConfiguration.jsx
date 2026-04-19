import { useState } from 'react';
import { Save, Upload, Play, Check, AlertCircle } from 'lucide-react';
import Button from '../UI/Button';
import { clsx } from 'clsx';

export default function AIConfiguration() {
  const [config, setConfig] = useState({
    provider: 'gpt-4o-mini',
    apiKey: ''
  });

  const [testResult, setTestResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleSaveConfig = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 3000);
      alert('AI Configuration saved successfully!');
    }, 1000);
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

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleRunTest = () => {
    if (!uploadedFile) {
      alert('Please upload a CV file first');
      return;
    }

    setIsLoading(true);
    setTestResult(null);

    // Simulate AI processing
    setTimeout(() => {
      setTestResult({
        status: 'success',
        data: {
          candidate_name: 'Nguyễn Văn An',
          email: 'nguyenvanan@email.com',
          phone: '+84 90 123 4567',
          experience_years: 5,
          skills: ['React', 'TypeScript', 'Node.js', 'AWS', 'PostgreSQL'],
          education: [
            {
              degree: 'Bachelor of Computer Science',
              institution: 'Hanoi University of Science and Technology',
              year: 2019
            }
          ],
          work_experience: [
            {
              company: 'Tech Startup Inc.',
              position: 'Senior Frontend Developer',
              duration: '2021 - Present',
              responsibilities: [
                'Led frontend development team of 5 developers',
                'Architected React-based component library',
                'Improved performance by 40%'
              ]
            },
            {
              company: 'Digital Agency Ltd.',
              position: 'Frontend Developer',
              duration: '2019 - 2021',
              responsibilities: [
                'Built responsive web applications',
                'Collaborated with design team',
                'Implemented CI/CD pipelines'
              ]
            }
          ],
          match_score: 0.87,
          summary: 'Strong candidate with 5 years of relevant experience in React and TypeScript. Demonstrated leadership skills and technical proficiency in modern web technologies.'
        }
      });
      setIsLoading(false);
    }, 2500);
  };

  return (
    <div className="flex flex-col gap-6 p-8 w-full bg-[#f8f9fa] min-h-screen overflow-y-auto">
      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">AI Configuration</h1>

      {/* Configuration Card */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-gray-800 font-bold text-lg tracking-wide mb-4">
          AI Provider Settings
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              AI Provider Model
            </label>
            <select
              value={config.provider}
              onChange={(e) => setConfig({ ...config, provider: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="gpt-4o-mini">GPT-4o Mini</option>
              <option value="gpt-4o">GPT-4o</option>
              <option value="gpt-4-turbo">GPT-4 Turbo</option>
              <option value="claude-3-opus">Claude 3 Opus</option>
              <option value="claude-3-sonnet">Claude 3 Sonnet</option>
              <option value="claude-3-haiku">Claude 3 Haiku</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              API Key
            </label>
            <input
              type="password"
              value={config.apiKey}
              onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your API key"
            />
            <p className="text-xs text-gray-500 mt-1">
              Your API key is encrypted and stored securely
            </p>
          </div>

          <div className="pt-4">
            <Button
              variant="primary"
              icon={isSaved ? Check : Save}
              onClick={handleSaveConfig}
              className={clsx(isSaved && 'bg-green-600 hover:bg-green-700')}
            >
              {isSaved ? 'Configuration Saved' : 'Save Configuration'}
            </Button>
          </div>
        </div>
      </div>

      {/* AI Testing Sandbox */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-gray-800 font-bold text-lg tracking-wide mb-4">
          AI Testing Sandbox
        </h2>

        <div className="space-y-4">
          {/* File Upload Zone */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Upload Sample CV
            </label>
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={clsx(
                'border-2 border-dashed rounded-xl p-8 text-center transition-colors',
                isDragging
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              )}
            >
              <input
                type="file"
                id="cv-upload"
                className="hidden"
                accept=".pdf,.docx"
                onChange={(e) => handleFileUpload(e.target.files[0])}
              />
              <label
                htmlFor="cv-upload"
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <Upload size={32} className="text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-700">
                    Drop your CV here or click to browse
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supports PDF and DOCX files
                  </p>
                </div>
              </label>
            </div>

            {uploadedFile && (
              <div className="mt-3 flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                <Check size={18} className="text-green-600" />
                <span className="text-sm text-green-700 font-medium">
                  {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(2)} KB)
                </span>
              </div>
            )}
          </div>

          {/* Run Test Button */}
          <div>
            <Button
              variant="primary"
              icon={Play}
              onClick={handleRunTest}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? 'Running AI Test...' : 'Run AI Test'}
            </Button>
          </div>

          {/* Test Results */}
          {testResult && (
            <div className="mt-6">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[#ff4d4f] font-bold text-sm uppercase tracking-wider">
                  Test Results
                </span>
                {testResult.status === 'success' && (
                  <span className="text-green-600 text-sm">
                    ● Processing successful
                  </span>
                )}
              </div>

              <div className="bg-[#20222a] text-white rounded-lg p-6 overflow-x-auto">
                <pre className="text-xs font-mono whitespace-pre-wrap">
                  {JSON.stringify(testResult.data, null, 2)}
                </pre>
              </div>

              {/* Summary Card */}
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle size={20} className="text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-1">Analysis Summary</h4>
                    <p className="text-sm text-blue-700">
                      {testResult.data.summary}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="text-sm font-semibold text-blue-900">Match Score:</span>
                      <div className="flex-1 max-w-xs h-2 bg-blue-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 transition-all duration-500"
                          style={{ width: `${testResult.data.match_score * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-bold text-blue-900">
                        {(testResult.data.match_score * 100).toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center p-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
