import React, { useState } from 'react';
import TabNavigation from './components/TabNavigation'; 
import JobTemplates from './templatemanagement/JobTemplates.jsx';
import EmailTemplates from './templatemanagement/EmailTemplates.jsx';

export default function TemplateManagement() {
  const [activeTab, setActiveTab] = useState('job-template');

  return (
    <div className="flex-1 flex flex-col h-full bg-[#f8f9fa] overflow-y-auto">
      <div className="p-8 space-y-6">

        <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="mt-6">
          {activeTab === 'job-template' ? <JobTemplates /> : <EmailTemplates />}
        </div>
      </div>
    </div>
  );
}