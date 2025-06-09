import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from './Modules/Pages/groupComponents/SideNav';
import LoginScreen from './Modules/Pages/pageComponents/LoginComponent/LoginScreen';
import AppRoutes from './Modules/Pages/baseComponents/Table/AppRoutes';

const App = () => {
  return (
    <Router>
      <AppRoutes /> {/* ✅ DON'T wrap this in <Routes> */}
    </Router>
  );
};

export default App;
