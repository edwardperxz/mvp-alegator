import React from 'react';
import Sidebar from '../components/Sidebar';

const Dashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
    </div>
  );
};

export default Dashboard;