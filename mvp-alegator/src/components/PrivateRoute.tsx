import React from 'react';
import { Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  // Sin validación de autenticación
  return <Outlet />;
};

export default PrivateRoute;