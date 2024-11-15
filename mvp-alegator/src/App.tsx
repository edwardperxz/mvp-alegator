import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Confirmation from './pages/Confirmation';
import Tournaments from './pages/Tournaments'; 
import Home from './pages/Home'; 
import ErrorPage from './pages/ErrorPage'; 
import PrivateRoute from './components/PrivateRoute';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#ADBC9F] flex flex-col justify-center">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirmation" element={<Confirmation />} />
        <Route element={<PrivateRoute />}>
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;