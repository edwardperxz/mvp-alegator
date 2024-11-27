import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Confirmation from './pages/Confirmation';
import Tournaments from './pages/Tournaments'; 
import Home from './pages/Home'; 
import ErrorPage from './pages/ErrorPage'; 
import CreateTournament from './pages/CreateTournament'; 
import SubscribeTournament from './pages/SubscribeTournaments'; 
import RegisterJudge from './pages/RegisterJudge';
import RegisterDebatient from './pages/RegisterDebatient';

const App: React.FC = () => {
  const isAuthenticated = true;

  return (
    <React.Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/confirmation" element={<Confirmation />} />
        {isAuthenticated ? (
          <>
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/home" element={<Home />} />
            <Route path="/create-tournament" element={<CreateTournament />} /> 
            <Route path="/subscribe-tournament" element={<SubscribeTournament />} /> 
            <Route path="/subscribe-tournament/judge" element={<RegisterJudge/>} /> 
            <Route path="/subscribe-tournament/debatient" element={<RegisterDebatient />} /> 
            <Route path="/" element={<Home />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </React.Fragment>
  );
};

export default App;