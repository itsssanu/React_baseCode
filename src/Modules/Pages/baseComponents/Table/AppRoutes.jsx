// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../../pageComponents/DashboardComponent/Dashboard';
import VehicleInfo from '../../pageComponents/VehicleComponent/VehicleInfo';
import MasterLayout from '../../MasterLayout';
import LoginScreen from '../../pageComponents/LoginComponent/LoginScreen';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginScreen/>} />
      {/* <Route path="/dashboard" element={<Navigate to="/dashboard" />} /> */}
      <Route element={<MasterLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/vehicle-info" element={<VehicleInfo />} />
        {/* Add more routes like /income, /expenses here */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;
