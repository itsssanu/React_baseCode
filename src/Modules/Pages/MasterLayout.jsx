// src/components/layout/MasterLayout.jsx
import React from 'react';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import SideNav from './groupComponents/SideNav';
import TopNav from './groupComponents/TopNav';

const { Content } = Layout;

const MasterLayout = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideNav />
      <Layout>
        <TopNav />
        <Content style={{ margin: '24px 16px', padding: 24,}}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MasterLayout;
