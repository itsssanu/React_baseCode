import React from "react";
import { Button, Table } from "antd"; 
import "./UserTable.scss";

const UserTable = ({

  dataSource,
  columns,
  rowClassName,
  loading,
  onRowClick,
  additionalButtonText,
  handleSubmit,
  isButtonVisible,
  submitLoading,
  pagination

}) => {
  return (
    <>
      <Table
        className="hostel-ant-table"
        dataSource={dataSource}
        columns={columns}
        loading={false}
        pagination={pagination}
        rowClassName={(record, index) => (rowClassName ? rowClassName(record, index) : "")}
        onRow={(record) => ({
          onClick: () => {
            if (onRowClick) onRowClick(record);
          },
        })}
      />
      {additionalButtonText && (
        <div className="mt-3">
          <Button
            className={`bg-[#181818] px-3 py-2 rounded-lg !text-white ${!isButtonVisible ? ' mt-2 bg-[#181818] cursor-not-allowed opacity-50' : ''}`}
            type="button"
            onClick={handleSubmit}
            disabled={!isButtonVisible}
            loading={submitLoading}
          >
            {additionalButtonText}
          </Button>
        </div>

      )}

    </>
  );
};

export default UserTable;
