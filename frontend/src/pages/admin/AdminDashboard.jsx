import React, { useState, useEffect } from 'react';
import { Card } from '../../components/common/Card';
import { Table } from '../../components/common/Table';
import { Button } from '../../components/common/Button';
import api from '../../axiosConfig';
import CvUploadedChart from './components/CvUploadedChart';
// import TopUserWidget from './components/TopUserWidget';
// import JobStatsList from './components/JobStatsList';

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardMetrics = async () => {
      try {
        const response = await api.get('/dashboard');
        if (response.status === 200) {
          // setDashboardData(response.data);
          console.log("Dữ liệu giả:", response.data);
          setDashboardData({
            chartData: [
              { name: 'Jan', aiCount: 40, normalCount: 24 },
              { name: 'Feb', aiCount: 30, normalCount: 13 },
              { name: 'Mar', aiCount: 20, normalCount: 98 },
              { name: 'Apr', aiCount: 27, normalCount: 39 },
              { name: 'May', aiCount: 18, normalCount: 48 },
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

  return (
    <div className="flex flex-col gap-6 p-8 w-full bg-gray-50 h-screen">
      <Card className="shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-red-500">Thống kê AI CV</h2>
          <Button variant="primary">Tải báo cáo</Button>
        </div>

        <div className="w-full h-80 mt-4">
          <CvUploadedChart data={dashboardData.chartData || dashboardData} />
        </div>
      </Card>
    </div>
  );
};

export default AdminDashboard;