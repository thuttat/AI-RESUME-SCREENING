import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import api from '../../axiosConfig';
import CvUploadedChart from './components/CvUploadedChart';
import TopUserWidget from './components/TopUserWidget';
import JobStatsList from './components/JobStatsList';
import KpiCard from './components/KpiCard';
import SimpleListWidget from './components/SimpleListWidget';


const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        const response = await api.get('admin/dashboard');
        if (response.status === 200) {
          // setDashboardData(response.data);
          console.log("Dữ liệu giả:", response.data);
          setDashboardData({
            chartData: [
              { month: 1, aiCount: 40, normalCount: 24 },
              { month: 2, aiCount: 30, normalCount: 13 },
              { month: 3, aiCount: 20, normalCount: 98 },
              { month: 4, aiCount: 27, normalCount: 39 },
              { month: 5, aiCount: 18, normalCount: 48 },
            ],
            mock: "Dữ liệu tạm"
          });
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu Dashboard:", error);


      }
    };

    fetchDashboardMetrics();
  }, []);

  if (!dashboardData) {
    return <div className="flex items-center justify-center h-full">Đang tải số liệu...</div>;
  }

  const jobListMock = [
    { name: 'Post 01' }, { name: 'Post 02' }, { name: 'Post 03' }, { name: 'Post 04' }
  ];

  return (
    <div className="flex flex-col gap-8 p-8 w-full bg-[#f8f9fa] min-h-screen overflow-y-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        <Button variant="primary">Tải báo cáo</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard title="TOTAL JOB POSTING" value={dashboardData.totalJobPosting} />
        <KpiCard title="TOTAL AI CV" value={dashboardData.totalAiCv} />
        <KpiCard title="TOTAL NORMAL CV" value={dashboardData.totalNormalCv} />
        <KpiCard title="ACTIVE USERS" value={dashboardData.activeUsers} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2 flex flex-col gap-8">
          <div className="bg-white p-2 rounded-xl shadow-sm">
            <CvUploadedChart data={dashboardData.chartData} />
          </div>

          <div className="w-full">
            <JobStatsList />
          </div>

          <div className="w-full">
            <TopUserWidget />
          </div>
        </div> 
      
        <div className="lg:col-span-1 flex flex-col gap-8">
          <SimpleListWidget title="Common Job Postings" items={jobListMock} />
          <SimpleListWidget title="Famous Job Posting" items={jobListMock} />
        </div>
      </div>
    </div> 
  );
};

export default AdminDashboard;
