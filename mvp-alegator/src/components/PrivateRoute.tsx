import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  // Supongamos que no necesitas validar autenticación
  // Puedes establecer isAuthenticated en true o false según tu necesidad
  const isAuthenticated = true; // O false si deseas redirigir siempre al login

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
