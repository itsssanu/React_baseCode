import React, { useState } from "react";
import { Select, Tag } from "antd";
import { CloseOutlined } from "@ant-design/icons";

const MultiSelectWithCheckBox = ({
  //multiselct using checkbox
  name,
  options,
  placeholder = "Select options",
  disabled = false,
  value = [],
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState(value);

  const allValues = options.map((option) => option.value);

  const handleSelect = (selected) => {
    let updatedValues;

    // If "Check All" is selected
    if (selected === "check_all") {
      updatedValues = allValues; // Select all options
    } else {
      updatedValues = [...selectedValues, selected];
    }

    setSelectedValues(updatedValues);
    if (onChange) onChange(updatedValues);
  };

  const handleDeselect = (removed) => {
    let updatedValues;

    // If "Check All" is deselected
    if (removed === "check_all") {
      updatedValues = []; // Clear all selections
    } else {
      updatedValues = selectedValues.filter((item) => item !== removed);
    }

    setSelectedValues(updatedValues);
    if (onChange) onChange(updatedValues);
  };

  return (
    <div className="p-2 mr-2 bg-white rounded-xl border border-[#BFBFBF]">
      <Select
        mode="multiple"
        value={selectedValues}
        disabled={disabled}
        onSelect={handleSelect}
        onDeselect={handleDeselect}
        placeholder={placeholder}
        className="w-full !border-none flex items-center !border-0 !focus:outline-none "
        // open={true}
        dropdownRender={(menu) => (
          <div>
            {menu}
          </div>
        )}
      >
        {options.map((option) => (
          <Select.Option key={option.value} value={option.value}>
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                readOnly
                className="mr-2 accent-primary" 
              />
              {option.label}
            </div>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default MultiSelectWithCheckBox;
