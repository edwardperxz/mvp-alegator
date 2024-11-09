import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Confirmation from './pages/Confirmation';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ADBC9F] flex flex-col justify-center">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
