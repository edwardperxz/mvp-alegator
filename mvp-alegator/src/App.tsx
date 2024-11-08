import React from 'react';
import Sidebar from './components/Sidebar';
import SetPin from './pages/SetPin';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow">
      </div>
      <Login />
    </div>
  );
};

export default App;