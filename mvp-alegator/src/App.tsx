import React from 'react';
import Sidebar from './components/Sidebar';
import SetPin from './pages/SetPin';
import Header from './components/Header';

const App: React.FC = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
    </div>
  );
};

export default App;