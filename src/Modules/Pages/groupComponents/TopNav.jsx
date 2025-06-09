// src/components/layout/TopNav.jsx
import React from 'react';
import { Layout } from 'antd';

const { Header } = Layout;

const TopNav = () => {
  return (
    <Header style={{ background: '#fff', padding: '0 16px', fontWeight: 'bold' }}>
      Lorry Expense Tracker
    </Header>
  );
};

export default TopNav;
