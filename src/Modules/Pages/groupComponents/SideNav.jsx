// src/components/layout/SideNav.jsx
import React from 'react';
import { Layout, Menu } from 'antd';
import { DashboardOutlined, CarOutlined, DollarOutlined, WalletOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const SideNav = () => {
  const navigate = useNavigate();

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: 'Dashboard', path: '/dashboard' },
    { key: 'vehicle-info', icon: <CarOutlined />, label: 'Vehicle Information', path: '/vehicle-info' },
    { key: 'income', icon: <DollarOutlined />, label: 'Income', path: '/income' },
    { key: 'expenses', icon: <WalletOutlined />, label: 'Expenses', path: '/expenses' },
  ];

  return (
    <Sider collapsible width={250}>
      <div className="text-white text-xl text-center p-6 font-semibold">Lorry Tracker</div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['dashboard']}> 
        {menuItems.map(item => (
          <Menu.Item key={item.key} icon={item.icon} onClick={() => navigate(item.path)}>
            {item.label}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default SideNav;
