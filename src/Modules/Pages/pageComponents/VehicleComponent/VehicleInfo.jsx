import React, { useState } from 'react';
import UserTable from '../../baseComponents/Table/UserTable';
import { Button, Input } from 'antd';
import { AddVehicelPopup } from './AddVehicelPopup';
import PlusButton from '../../baseComponents/Button/PlusButton';

const dummyVehicleData = [
    {
      key: "1",
      vehicleNo: "TN10AB1234",
      model: "Tata 407",
      owner: "Ravi Kumar",
      dueDate: "2025-07-10",
      emiAmount: "₹15,000",
      emiDuration: "12 months",
      insuranceDate: "2025-06-15",
    },
    {
      key: "2",
      vehicleNo: "TN22CD5678",
      model: "Ashok Leyland",
      owner: "Mohan Raj",
      dueDate: "2025-08-01",
      emiAmount: "₹18,500",
      emiDuration: "18 months",
      insuranceDate: "2025-07-20",
    },
  ];
  
  const VehicleInfo = () => {
    const [searchVehicle, setSearchVehicle] = useState("");
    const [searchOwner, setSearchOwner] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    // Columns for AntD Table
    const columns = [
      {
        title: "Vehicle No",
        dataIndex: "vehicleNo",
        key: "vehicleNo",
      },
      {
        title: "Model",
        dataIndex: "model",
        key: "model",
      },
      {
        title: "Owner",
        dataIndex: "owner",
        key: "owner",
      },
      {
        title: "Due Date",
        dataIndex: "dueDate",
        key: "dueDate",
      },
      {
        title: "EMI Amount",
        dataIndex: "emiAmount",
        key: "emiAmount",
      },
      {
        title: "EMI Duration",
        dataIndex: "emiDuration",
        key: "emiDuration",
      },
      {
        title: "Insurance Date",
        dataIndex: "insuranceDate",
        key: "insuranceDate",
      },
    ];
  
    // Filter the data
    const filteredData = dummyVehicleData.filter((item) => {
      return (
        item.vehicleNo.toLowerCase().includes(searchVehicle.toLowerCase()) &&
        item.owner.toLowerCase().includes(searchOwner.toLowerCase())
      );
    });
  
    return  (
        <div>

          {/* Filter & Button Row */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
              <Input
                placeholder="Search by Vehicle No"
                value={searchVehicle}
                onChange={(e) => setSearchVehicle(e.target.value)}
                className="w-full md:w-80"
              />
              <Input
                placeholder="Search by Owner Name"
                value={searchOwner}
                onChange={(e) => setSearchOwner(e.target.value)}
                className="w-full md:w-80"
              />
            </div>
            <PlusButton text="Add Vehicle Info" onClick={() => setIsModalOpen(true)}/>
            
          </div>
    
          {/* Table */}
          <UserTable
            dataSource={filteredData}
            columns={columns}
            pagination={{ pageSize: 5 }}
            rowClassName={() => "cursor-pointer"}
          />
    
          <AddVehicelPopup isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
        </div>
    );
  };
  
  export default VehicleInfo;
